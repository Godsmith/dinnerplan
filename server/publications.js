'use strict';

Meteor.publish("days", function() {
  return Days.find({ owner: this.userId });
});
Meteor.publish("meals", function() {
  return Meals.find({ owner: this.userId });
});
Meteor.publish("currentUser", function() {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId});
  }
});
