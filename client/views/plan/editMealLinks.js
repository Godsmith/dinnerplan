'use strict';

Template.editMealLinks.helpers({
  meals: function() {
    let mealText = Template.currentData().meal;
    if (!mealText) {
      return [];
    }
    let untrimmedMeals = mealText.split(';');
    let trimmedMeals = untrimmedMeals
      .map($.trim)
      .filter((meal) => meal.length > 0)
      .map(function(meal){
      return {
        meal: meal
      };
    });
    return trimmedMeals
  }
});






