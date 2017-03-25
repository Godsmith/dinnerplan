'use strict';

Template.recipes.helpers({
  meals: function() {
    Meteor.call("meals", {category: Session.get('activeCategoryDatabaseLookupString')}, function(error, value) {
      Session.set("meals", value);
    });
    return Session.get("meals");
  },
  categories: () => CATEGORIES
});

Template.recipes.events({
  'click a.category': function(event) {
    let categoryDatabaseLookupString = event.target.getAttribute('data-category');
    Session.set('activeCategoryDatabaseLookupString', categoryDatabaseLookupString)
  }
});

Template.category.helpers({
  isActive: (categoryDatabaseLookupString) =>
    Session.get('activeCategoryDatabaseLookupString') === categoryDatabaseLookupString ? 'active' : ''
});
