'use strict';

Template.editMealLink.helpers({
  mealLinkClass: meal => _.contains(Session.get('mealNames'), meal) ? 'exists' : ''
});

Template.editMealLink.events({
  'click a': function(event, template) {
    var mealName = template.data.meal;
    Meteor.call('mealFromName', mealName, function(error, result) {
      showEditMealModal(result);
    });
  }
});
