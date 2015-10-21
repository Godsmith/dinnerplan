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
  mealFromName: function(name) {
    var meal = Meals.find({
      owner: Meteor.userId(),
      name: name
    }).fetch()[0];
    meal = meal ? meal : {name: name};
    return meal
  },
  updateMeal: function(meal) {
    meal.owner = Meteor.userId();
    meal.username = Meteor.user().username;
    Meals.upsert({
      name: meal.name,
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

  updateWeeksForward: function(weeksForward) {
    Meteor.users.update({_id: Meteor.userId()}, {$set: {weeksForward: weeksForward}})
  }
});

