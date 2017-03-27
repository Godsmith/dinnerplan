'use strict';

Template.editDay.onRendered(function(){
  this.autorun(function(){
    // This runs when the "day" session variable is updated, i.e. when clicking an edit button
    let day = Session.get("day");
    let meals = Session.get('meals');
    if (!day) {
      return;
    }
    let mealsArray = (day.meal ? day.meal.split(';') : []).map(s => s.trim());
    let selectizeControl = $('#meal-name');
    var $select = selectizeControl.selectize({
      valueField: 'name',
      labelField: 'name',
      searchField: 'name',
      persist: false,
      delimiter: ';',
      openOnFocus: false,
      create: (input => {return {name: input}}),
      createOnBlur: true,
      options: meals
    });

    // Store the reference to the selectize in the data property to be able to access it elsewhere
    // From here: http://stackoverflow.com/questions/24666297/how-to-get-the-value-of-the-currently-selected-selectize-js-input-item
    selectizeControl.data('selectize', $select);

    // Only options in the list may be displayed in the box, so in order to be able to show
    // also meals that are not in the database in the input box we need to add them as options.
    var selectize = $select[0].selectize;
    mealsArray.forEach((mealName) => {
      selectize.addOption({name: mealName});
    });
    selectize.setValue(mealsArray);
    // Focus the input box here as well, or it will not be focused the first time after the user
    // has navigated to the page that they click an edit box
    selectize.focus();
  });
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
  'click .cancel'() { cancel(); },

  'keydown .selectize-input': (event) => {
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        ok();
        break;
    }
  },
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
