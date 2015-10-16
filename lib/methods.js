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
  }
});

