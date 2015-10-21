'use strict';

Template.editMeal.helpers({
  textareas: function() {
    var meal = Session.get('meal');
    if (!meal) return false;
    var retVal = _.map(mealParameters, function(mealParameter) {
      return {
        id: mealParameter.textareaId,
        label: mealParameter.textareaLabel,
        value: meal[mealParameter.key]
      }
    });
    return retVal;
  }
});

Template.editMeal.events({
  'click .ok': function(event, template){
    let meal = {};
    for (let mealParameter of mealParameters) {
      meal[mealParameter.key] = $('#' + mealParameter.textareaId).val()
    }

    Meteor.call('updateMeal', meal);
    Session.set('displayEditMeal', false);
    loadMealNames(); // To make the meal blue. Should be done reactively instead.
  },

  'click .cancel': function(event, template){
    Session.set('displayEditMeal', false);
  }
});

Template.editMeal.onRendered(function(){
  this.autorun(function(){
    Session.get("meal");
    Tracker.afterFlush(function() {
      $('textarea').each(function () {
        adjustTextAreaHeight(this);
      });
    });
  });
});
