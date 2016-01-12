'use strict';

Template.ingredients.helpers({
  categories: () => CATEGORIES,
  meals: function() {
    return Session.get("meals");
  }
});

Template.ingredients.events({
  'click #ingredient-ok': function(event) {
    ok();
  },
  'keydown #ingredient': function(event, template) {
    switch (event.keyCode) {
      case 13:
        ok();
        break;
    }
  }
});

function ok() {
  Meteor.call("meals", {ingredient: $('#ingredient').val()}, function(error, value) {
    Session.set("meals", value);
  });
}
