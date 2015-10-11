Days = new Mongo.Collection('days');
Meals = new Mongo.Collection('meals');

if (Meteor.isClient) {
  Meteor.subscribe('days');
  Meteor.subscribe('meals');
  moment.locale(navigator.language)

  Template.body.helpers({
    days: function() {
      var query = Days.find({},{sort: {date: 1}});
      var daysWithMeals = query.fetch();
      //return daysWithMeals;
      var padding = getDays(28, 7);
      return padObjectArray(daysWithMeals, padding, isSameDay)
    }
  });

  Template.day.helpers({
    stringFromDate: function(date){
      return moment(date).format('dddd YYYY-MM-DD')
    },
    dateOfDayFromDate: function(date){
      return dateOfDayFromDate(date);
    }
  });

  Template.day.events({
    'change .meal': function(event, template){
      this.meal = $(event.target).val();
      Meteor.call('updateDay', this);
      console.log('updated ' + this.date + ' with text ' + this.meal)
    },

    'click .edit': function(event, template){
      var dateOfDay = dateOfDayFromDate(this.date);
      $('.viewing.date-' + dateOfDay).hide();
      $('.editing.date-' + dateOfDay).show();
      $('.editing.date-' + dateOfDay + ' input').select();
    },

    'click .ok': function(event, template){
      ok(this);
    },

    'click .cancel': function(event, template){
      cancel(this);
    },

    'keydown .editing input': function(event, template){
      switch (event.keyCode) {
        case 13:
          ok(this);
          break;
        case 27:
          cancel(this);
          break;
      }
    }
  });

  var ok = function(day) {
    var dateOfDay = dateOfDayFromDate(day.date);
    day.meal = $('.date-' + dateOfDay + ' input').val();
    Meteor.call('updateDay', day);
    hideEditing(dateOfDay);
    console.log('updated ' + day.date + ' with text ' + day.meal)
  };

  var cancel = function(day) {
    var dateOfDay = dateOfDayFromDate(day.date);
    hideEditing(dateOfDay);
    $('.date-' + dateOfDay + ' input').val(day.meal);
  };

  var hideEditing = function(dateOfDay) {
    $('.viewing.date-' + dateOfDay).show();
    $('.editing.date-' + dateOfDay).hide();
  };

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish("days", function() {
    return Days.find({ owner: this.userId });
  });
  Meteor.publish("meals", function() {
    return Meals.find({ owner: this.userId });
  });
}

Meteor.methods({
  updateDay: function(day) {
    Days.update({
      date: day.date,
      owner: Meteor.userId()
    }, {
      date: day.date,
      meal: day.meal,
      owner: Meteor.userId(),
      username: Meteor.user().username
    }, {upsert: true});
  }
});

// TODO: move this somewhere better. Note that it is a global function, so it can be accessed
// by meteor from everywhere
getDays = function(daysBack, daysForward) {
  var days = [];
  for (var i =-daysBack; i <= daysForward; i++) {
    date = moment().utc().add(i, 'days').startOf('day').toDate();
    days.push({date: date})
  }
  return days
};

padObjectArray = function(originalArray, padObjects, compareFunction) {
  var retVal = padObjects.slice();
  originalArray.forEach(function(originalObject) {
    for (var i = 0; i < padObjects.length; i++) {
      if (compareFunction(originalObject, padObjects[i])) {
        retVal[i] = originalObject;
        break;
      }
    }
  });
  return retVal
};

isSameDay = function(day1, day2) {
  return (day1.date.getDate() == day2.date.getDate()
    && day1.date.getMonth() == day2.date.getMonth()
    && day1.date.getFullYear() == day2.date.getFullYear());
};

dateOfDayFromDate = function(date) {
  return moment(date).format('YYYY-MM-DD')
};