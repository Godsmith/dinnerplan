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
  'click .ok': function(){
    let meal = {};
    for (let mealProperty of MEAL_PROPERTIES) {
      var element = $('#' + mealProperty.htmlId);
      var value;
      switch (mealProperty.type) {
        case 'textarea':
          value = element.val();
          break;
        case 'rating':
          value = $('label.active').text();
          break;
        case 'categories':
          value = $('#inputMealCategories').val();
          break;
        case 'servings':
          value = $('#inputMealServings option:selected').text()
          break;
        default:
          throw "Error: Tried to store unknown meal property type '" + mealProperty.type + "' to" +
          " the database"
      }
      meal[mealProperty.databaseKeyName] = $.trim(value);
    }

    let oldMealName = Session.get('meal').name;
    if (oldMealName == undefined) {
      oldMealName = meal.name;
    }
    if (oldMealName === meal.name) {
      updateMealAndHideModal(oldMealName, meal);
    } else {
      Meteor.call('mealExists', meal.name, function(error, mealExists) {
        if (mealExists) {
          let divSurroundingNameField = $('#inputMealName').parent();
          divSurroundingNameField.addClass('has-error');
          let helpBlock = divSurroundingNameField.find('.help-block');
          helpBlock.text(STRINGS.nameAlreadyExists);
          helpBlock.css('display', 'inline');
        } else {
          Meteor.call('updateMealNameInDaysDatabase', oldMealName, meal.name);
          updateMealAndHideModal(oldMealName, meal);
        }
      });
    }
  }
});

function updateMealAndHideModal(oldMealName, meal) {
  Meteor.call('updateMeal', oldMealName, meal);
  loadMealNames(); // To make the meal blue. Should be done reactively instead.
  $('#editMealModal').modal('hide');
}

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

Template.servings.helpers({
  servingNumbers: function() {
    let retVal = [];
    for (let i=1; i<=10; i++) {
      retVal.push({
        number: i,
        selected: i==this.value ? 'selected' : ''
      })
    }
    return retVal;
  }
});
