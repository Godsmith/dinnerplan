'use strict';

Template.editMeal.helpers({
  textareas: function() {
    var meal = Session.get('meal');
    if (!meal) return false;
    var retVal = _.map(MEAL_PARAMETERS, function(mealParameter) {
      return {
        id: mealParameter.htmlId,
        label: mealParameter.label,
        value: meal[mealParameter.databaseKeyName],
        type: mealParameter.type
      }
    });
    return retVal;
  }
});

Template.editMeal.events({
  'click .ok': function(event, template){
    let meal = {};
    for (let mealParameter of MEAL_PARAMETERS) {
      var element = $('#' + mealParameter.htmlId);
      var value;
      switch (mealParameter.type) {
        case 'textarea':
          value = element.val();
          break;
        case 'rating':
          value = $.trim($('label.active').text());
      }
      meal[mealParameter.databaseKeyName] = value;
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
    // Resize textareas after loading data from the database
    Tracker.afterFlush(function() {
      $('textarea').each(function () {
        adjustTextAreaHeight(this);
      });
    });
  });
});

Template.textarea.helpers({
  equals: (a,b) => a==b
});

Template.ratings.helpers({
  numbers: function() {
    var list = [];
    for (var i = 1; i<=5; i++) {
      var obj = {};
      obj.number = i;
      obj.active = this.value == i ? 'active' : '';
      list.push(obj);
    }
    return list
  }
});

