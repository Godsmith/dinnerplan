'use strict';

Template.editMeal.helpers({
  mealProperties: function() {
    var meal = Session.get('meal');
    if (!meal) return false;
    var retVal = _.map(MEAL_PROPERTIES, function(mealProperty) {
      return {
        id: mealProperty.htmlId,
        label: mealProperty.label,
        value: meal[mealProperty.databaseKeyName],
        type: mealProperty.type
      }
    });
    return retVal;
  }
});

Template.editMeal.events({
  'click .ok': function(event, template){
    let meal = {};
    for (let mealProperty of MEAL_PROPERTIES) {
      var element = $('#' + mealProperty.htmlId);
      var value;
      switch (mealProperty.type) {
        case 'textarea':
          value = element.val();
          break;
        case 'rating':
          value = $.trim($('label.active').text());
          break;
        case 'categories':
          value = $('#inputMealCategories').val();
          break;
        default:
          throw "Error: Tried to store unknown meal property type '" + mealProperty.type + "' to" +
          " the database"
      }
      meal[mealProperty.databaseKeyName] = value;
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

Template.categories.onRendered(function() {
  var $select = $('#inputMealCategories').selectize({
    valueField: 'value',
    labelField: 'value',
    searchField: 'value',
    options: CATEGORIES
  });
  var selectize = $select[0].selectize;
  
  this.autorun(function(){
    var meal = Session.get("meal");
    let categoriesArray = meal.categories ? meal.categories.split(',') : [];
    selectize.setValue(categoriesArray);
  });
});

Template.mealProperty.helpers({
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

