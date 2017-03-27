Meteor.subscribe('days');
Meteor.subscribe('meals');
Meteor.subscribe('currentUser');

adjustTextAreaHeight = function(textarea) {
  textarea.style.height = 'auto';
  //Needs a magic number of 2 here to avoid scrollbars, don't know why
  //32 is the height of a single row, to ensure one row is always shown
  textarea.style.height = (Math.max(textarea.scrollHeight, 32) + 2) + 'px';
  //textarea.style.height = (textarea.scrollHeight + 2) + 'px';
};

showEditMealModal = function(meal) {
  // Needed in the editMeal dialog
  Session.set('meal', meal);

  // Remove label marking so that it does not carry over
  $('label.rating').removeClass('active');

  let divSurroundingNameField = $('#inputMealName').parent();
  divSurroundingNameField.removeClass('has-error');

  let helpBlock = divSurroundingNameField.find('.help-block');
  helpBlock.css('display', 'none');

  Session.set('editing', meal._id == undefined);
  for (mealProperty of getMealProperties()) {
    $('#' + mealProperty.htmlId).val(meal[mealProperty.databaseKeyName]);
  }

  $('#editMealModal').modal();
};