Template.day.helpers({
  dayFromDate: function(date){
    return moment(date).format('dddd').capitalize();
  },
  formatDate: function(date){
    return moment(date).format('YYYY-MM-DD');
  },
  mealLinkClass: function(meal) {
    return _.contains(Session.get('mealNames'), meal) ? 'exists' : '';
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
  },

  'click a': function(event, template) {
    var mealName = template.data.meal;
    Meteor.call('mealFromName', mealName, function(error, result) {
      Session.set('meal', result);
      Session.set('displayEditMeal', true);
    });
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
};

