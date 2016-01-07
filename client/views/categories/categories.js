'use strict';

Template.categories.helpers({
  categories: () => CATEGORIES,
  meals: function() {
    Meteor.call("meals", Session.get('activeCategory'), function(error, value) {
      Session.set("meals", value);
    });
    return Session.get("meals");
  }
});

Template.categories.events({
  'click a': function(event) {
    let category = $(event.target).attr('class');
    Session.set('activeCategory', category)
  }
});

Template.category.helpers({
  isActive: (category) => Session.get('activeCategory') === category ? 'active' : ''
});
