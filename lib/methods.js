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
  getMealFromName: function(name) {
    Meals.find({
      owner: Meteor.userId(),
      name: name
    })
  }
});

