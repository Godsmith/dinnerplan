'use strict';

let textareaAutocompleter = undefined;

Template.day.helpers({
  dayFromDate: date => moment(new Date(date)).format('dddd').capitalize(),
  formatDate: date => moment(new Date(date)).format('YYYY-MM-DD'),
  mealExists: meal => meal
});

Template.day.events({
  'click .edit'() { edit(this); },
  'click .ok'() { ok(this); },
  'click .cancel'() { cancel(this); },
  'click td.meal-name'() {
    if (!this.meal) {
      edit(this);
    }
  },

  'keydown .editing textarea': function(event, template){
    textareaAutocompleter.keydown(event.target, event.keyCode);
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

  'keyup .editing textarea': function(event, template) {
    textareaAutocompleter.keyup(event.target, Session.get('mealNames'));
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
  textareaAutocompleter = new TextareaAutocompleter();
});

function edit(day) {
  $('.viewing.date-' + day.date).hide();
  $('.editing.date-' + day.date).show();
  let textarea = $('.editing.date-' + day.date + ' textarea')[0];
  adjustTextAreaHeight(textarea); // So that the textarea height will scale with the text
  textarea.select();
}

var ok = function(day) {
  day.meal = $.trim($('.date-' + day.date + ' textarea').val());
  if (day.meal.length > 0) {
    Meteor.call('updateDay', day);
  } else {
    Meteor.call('removeDay', day)
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
