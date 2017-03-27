'use strict';


Template.day.helpers({
  dayFromDate: date => moment(new Date(date)).format('dddd').capitalize(),
  formatDate: date => moment(new Date(date)).format('YYYY-MM-DD'),
  mealExists: meal => meal,
  isToday: date => date == moment().format('YYYY-MM-DD') ? 'today' : ''
});

Template.day.events({
  'click .edit'() {
    edit(this);
  },
  'click td.meal-name'() {
    if (!this.meal) {
      edit(this);
    }
  },
  'dragstart td.meal-name'(event, template) {
    event.dataTransfer = event.originalEvent.dataTransfer;
    event.dataTransfer.setData('text', template.data.meal);
    event.dataTransfer.setData('date', template.data.date);
  },
  'dragover td'(event) {
    event.preventDefault();
  },
  'drop td'(event) {
    let sourceDate = event.originalEvent.dataTransfer.getData('date');
    Meteor.call('updateDay', {
      date: sourceDate,
      meal: this.meal
    });
    this.meal = event.originalEvent.dataTransfer.getData('text');
    Meteor.call('updateDay', this);
  }
});

Template.day.onRendered(function () {
  // If this template is created, it is because we clicked ok when creating it.
  // After this, we have to focus the edit button.
  var editButton = Session.get("editButtonToFocus");
  if (editButton) {
    $(editButton).focus();
    Session.set("editButtonToFocus", null);
  }
});

function edit(day) {
  Meteor.call('meals', (error, result) => {
    Session.set("meals", result);
    Session.set('day', day);
    $('#editDayModal').modal();
    setFocusToInputBox();
  });
}

function setFocusToInputBox() {
  let selectizeControl = $('#meal-name').data('selectize');
  if (selectizeControl) {
    let selectize = selectizeControl[0].selectize;
    selectize.focus()
  }
}

