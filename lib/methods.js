'use strict';

Meteor.methods({
  updateDay: function(day) {
    Days.update({
      date: day.date,
      owner: Meteor.userId()
    }, {
      date: day.date,
      meal: day.meal,
      owner: Meteor.userId(),
      username: Meteor.user().username
    }, {upsert: true});
  },
  removeDay: function(day) {
    Days.remove({
      date: day.date,
      owner: Meteor.userId()
    });
  },
  updateMealNameInDaysDatabase: function(oldName, newName) {
    Days.update({
      owner: Meteor.userId(),
      meal: oldName
    }, {
      $set: { 'meal': newName }
    }, { multi: true });
  },
  mealFromName: function(name) {
    var meal = Meals.find({
      owner: Meteor.userId(),
      name: name
    }).fetch()[0];
    meal = meal ? meal : {name: name};
    return meal
  },
  mealExists: function(name) {
    var meal = Meals.findOne({
      owner: Meteor.userId(),
      name: name
    });
    return meal != null
  },
  updateMeal: function(mealNameToUpdate, meal) {
    meal.owner = Meteor.userId();
    meal.username = Meteor.user().username;
    Meals.upsert({
      name: mealNameToUpdate,
      owner: Meteor.userId()
    }, meal, {upsert: true})
  },
  mealNames: function() {
    return _.map(Meals.find({
      owner: Meteor.userId()
    }).fetch(), function(meal) { return meal.name });
  },

  updateWeeksBack: function(weeksBack) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {weeksBack: weeksBack}})
  },

  updateNumberOfWeeks: function(numberOfWeeks) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {numberOfWeeks: numberOfWeeks}})
  },

  meals: function(options) {
    let query = {
      owner: Meteor.userId()
    };
    if (options) {
      if (options.category) {
        query.categories = new RegExp('.*' + options.category + '.*', 'i');
      }
      if (options.ingredient) {
        query.ingredients = new RegExp('.*' + options.ingredient + '.*', 'i')
      }
    }
    return Meals.find(query, {sort: {name: 1}}).fetch();
  },

  setUserLanguage: function(language) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {language: language}})
  }
});
