Template.editMeal.helpers({
  display: function() {
    return Session.get('displayEditMeal') ? '' : 'display: none;';
  },
  meal: function() {
    return Session.get('meal');
  }
});
