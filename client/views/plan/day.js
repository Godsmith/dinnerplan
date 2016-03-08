'use strict';


Template.day.helpers({
  dayFromDate: date => moment(new Date(date)).format('dddd').capitalize(),
  formatDate: date => moment(new Date(date)).format('YYYY-MM-DD'),
  mealExists: meal => meal
});

Template.day.events({
  'click .edit'() { edit(this); },
  'click td.meal-name'() {
    if (!this.meal) {
      edit(this);
    }
  },
  'dragstart td.meal-name'(event, template) {
    console.log('dragstart')
    event.dataTransfer = event.originalEvent.dataTransfer;
    event.dataTransfer.setData('text', template.data.meal);
    event.dataTransfer.setData('date', template.data.date);
  },
  'dragover td'(event) {
    console.log('dragover')
    event.preventDefault();
  },
  'drop td'(event) {
    console.log('drop')
    let sourceDate = event.originalEvent.dataTransfer.getData('date');
    Meteor.call('updateDay', {
      date: sourceDate,
      meal: this.meal
    });
    this.meal = event.originalEvent.dataTransfer.getData('text');
    Meteor.call('updateDay', this);
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

function edit(day) {
  loadMealNames();
  Session.set('day', day);
  $('#editDayModal').modal();
  let textarea = $('#meal-name');
  textarea.val(day ? day.meal : '');
  textarea.focus();
  textarea.select();
  Tracker.afterFlush(function() {
    adjustTextAreaHeight(textarea[0]); // So that the textarea height will scale with the text
  });
}

function loadMealNames() {
  Meteor.call('mealNames', (error, result) => { Session.set("mealNames", result); });
}
