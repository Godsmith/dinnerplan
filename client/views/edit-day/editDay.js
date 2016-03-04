'use strict';

let textareaAutocompleter = undefined;

Template.editDay.onRendered(function(){
  textareaAutocompleter = new TextareaAutocompleter();
});

Template.editDay.helpers({
  //mealName: function() {
  //  let day = Session.get('day');
  //  return day ? day.meal : '';
  //},
  title: function() {
    let day = Session.get('day');
    if (!day) {
      return '';
    }
    let weekday = moment(new Date(day.date)).format('dddd').capitalize();
    return weekday + ' ' + day.date;
  }
});

Template.editDay.events({

  'click .ok'() { ok(); },
  'click .cancel'() {
    cancel();
  },

  'keydown #meal-name': function(event){
    textareaAutocompleter.keydown(event.target, event.keyCode);
    switch (event.keyCode) {
      case 13:
        event.preventDefault(); //to prevent the enter key to trigger the edit button
        ok();
        break;
      case 27:
        cancel();
        break;
    }
  },

  'keyup #meal-name': function(event, template) {
    textareaAutocompleter.keyup(event.target, Session.get('mealNames'));
  }
});

function ok() {
  let day = Session.get('day');
  day.meal = $.trim($('#meal-name').val());
  if (day.meal.length > 0) {
    Meteor.call('updateDay', day);
  } else {
    Meteor.call('removeDay', day)
  }

  hideModal();

  // Focus the edit button when the template is created next time
  Session.set("editButtonToFocus", editButtonToFocus(day));
}

function cancel() {
  hideModal();
}

function hideModal() {
  let day = Session.get('day');
  $('#editDayModal').modal('hide');
  $(editButtonToFocus(day)).focus();
}

let editButtonToFocus = (day) => '.date-' + day.date + ' .edit';
