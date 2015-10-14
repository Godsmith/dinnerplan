Days = new Mongo.Collection('days');
Meals = new Mongo.Collection('meals');

Array.prototype.chunk = function(chunkSize) {
  var R = [];
  for (var i=0; i<this.length; i+=chunkSize)
    R.push(this.slice(i,i+chunkSize));
  return R;
};
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

if (Meteor.isClient) {
  Meteor.subscribe('days');
  Meteor.subscribe('meals');
  moment.locale(navigator.language)

  Template.body.helpers({
    weeks: function() {
      var query = Days.find({},{sort: {date: 1}});
      var daysWithMeals = query.fetch();
      var padding = getDaysFromWeekRange(1,2);
      var allDays = padObjectArray(daysWithMeals, padding, dateOfDayIsEqual);
      var dayChunks = allDays.chunk(7);
      var allWeeks = [];
      dayChunks.forEach(function(dayChunk) {
        allWeeks.push({days: dayChunk});
      });
      return allWeeks;
    }
  });

  Template.week.helpers({
    days: function() {
      return this.days;
    }
  });

  Template.day.helpers({
    dayFromDate: function(date){
      return moment(date).format('dddd').capitalize();
    },
    formatDate: function(date){
      return moment(date).format('YYYY-MM-DD');
    }
  });

  Template.day.events({
    'change .meal': function(event, template){
      this.meal = $(event.target).val();
      Meteor.call('updateDay', this);
      console.log('updated ' + this.date + ' with text ' + this.meal)
    },

    'click .edit': function(event, template){
      $('.viewing.date-' + this.date).hide();
      $('.editing.date-' + this.date).show();
      $('.editing.date-' + this.date + ' input').select();
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
          event.preventDefault(); //to prevent the enter key to trigger the edit button
          ok(this);
          break;
        case 27:
          cancel(this);
          break;
      }
    }
  });

  Template.day.onRendered(function(){
    // If this template is created, it is because we clicked ok when creating it.
    // After this, we have to focus the edit button.
    focusEditButton(this.data);
  });

  var ok = function(day) {
    day.meal = $('.date-' + day.date + ' input').val();
    Meteor.call('updateDay', day);
    hideEditing(day);
    console.log('updated ' + day.date + ' with text ' + day.meal)
    focusEditButton(day);
  };

  var cancel = function(day) {
    hideEditing(day);
    $('.date-' + day.date + ' input').val(day.meal);
    focusEditButton(day);
  };

  var hideEditing = function(day) {
    $('.viewing.date-' + day.date).show();
    $('.editing.date-' + day.date).hide();
  };

  var focusEditButton = function(day) {
    $('.viewing.date-' + day.date + ' .edit').focus();
    console.log($(':focus'));
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
    var date = moment().utc().add(i, 'days').startOf('day').format('YYYY-MM-DD');
    days.push({date: date})
  }
  return days;
};

getDaysFromWeekRange = function(weeksBack, weeksForward) {
  var days = [];
  for (var i=-weeksBack; i<=weeksForward; i++) {
    for (var j=1; j<=7; j++) {
      var date = moment().isoWeekday(i*7+j).startOf('day').format('YYYY-MM-DD');
      days.push({date: date});
    }
  }
  return days;
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
  return retVal;
};

dateOfDayIsEqual = function(day1, day2){
  return day1.date === day2.date;
};