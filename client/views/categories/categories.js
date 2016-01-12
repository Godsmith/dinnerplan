'use strict';

Template.categories.helpers({
  categories: () => CATEGORIES,
  meals: function() {
    Meteor.call("meals", {category: Session.get('activeCategory')}, function(error, value) {
      Session.set("meals", value);
    });
    return Session.get("meals");
  }
});

Template.categories.events({
  'click a.category': function(event) {
    let category = event.target.getAttribute('data-category');
    Session.set('activeCategory', category)
  }
});

Template.category.helpers({
  isActive: (category) => Session.get('activeCategory') === category ? 'active' : ''
});
