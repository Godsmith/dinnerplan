'use strict';

Template.day.helpers({
  dayFromDate: date => moment(date).format('dddd').capitalize(),
  formatDate: date => moment(date).format('YYYY-MM-DD'),
  mealLinkClass: meal => _.contains(Session.get('mealNames'), meal) ? 'exists' : '',
  mealExists: meal => meal
});

Template.day.events({
  'click .edit'() {
    $('.viewing.date-' + this.date).hide();
    $('.editing.date-' + this.date).show();
    let textarea = $('.editing.date-' + this.date + ' textarea')[0];
    adjustTextAreaHeight(textarea); // So that the textarea height will scale with the text
    textarea.select();
  },
  'click .ok'() { ok(this); },
  'click .cancel'() { cancel(this); },

  'keydown .editing textarea': function(event, template){
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
    // Remove label marking so that it does not carry over
    $('label.rating').removeClass('active');

    var mealName = template.data.meal;
    Meteor.call('mealFromName', mealName, function(error, result) {
      Session.set('meal', result);
      $('#editMealModal').modal();
    });
  }
});

Template.day.onRendered(function(){
  // If this template is created, it is because we clicked ok when creating it.
  // After this, we have to focus the edit button.
  var editButton = Session.get("editButtonToFocus");
  if (editButton) {
    $(editButton).focus();
    Session.set("editButtonToFocus", null);
  }
});

var ok = function(day) {
  day.meal = $.trim($('.date-' + day.date + ' textarea').val());
  if (day.meal.length > 0) {
    Meteor.call('updateDay', day);
  }

  hideEditing(day);
  $(editButtonToFocus(day)).focus();
  // Focus the edit button when the template is created next time
  Session.set("editButtonToFocus", editButtonToFocus(day));
};

var cancel = function(day) {
  hideEditing(day);
  $('.date-' + day.date + ' textarea').val(day.meal);
  $(editButtonToFocus(day)).focus();
};

var hideEditing = function(day) {
  $('.viewing.date-' + day.date).show();
  $('.editing.date-' + day.date).hide();
};

let editButtonToFocus = (day) => '.viewing.date-' + day.date + ' .edit';

