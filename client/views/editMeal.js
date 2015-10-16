Template.editMeal.helpers({
  display: function() {
    return Session.get('displayEditMeal') ? '' : 'display: none;';
  }
});
