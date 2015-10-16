Meteor.publish("days", function() {
  return Days.find({ owner: this.userId });
});
Meteor.publish("meals", function() {
  return Meals.find({ owner: this.userId });
});
