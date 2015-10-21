Meteor.subscribe('days');
Meteor.subscribe('meals');

Meteor.startup(function() {
  loadMealNames();
});

loadMealNames = function() {
  Meteor.call('mealNames', function(error, result) {
    Session.set("mealNames", result);
  });
};

adjustTextAreaHeight = function(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight) + 'px';
};
