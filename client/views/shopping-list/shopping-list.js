Template.shoppingList.events({
  'click #generate-shopping-list'() {
    let currentDate = moment().format('YYYY-MM-DD');
    let futureMeals = Days.find({date: {$gt: currentDate}}).fetch().map((day)=>day.meal);
    let ingredientsPerRecipe = Meals.find({name: {$in: futureMeals}}).fetch().map((meal)=>meal.ingredients);
    let ingredients = ingredientsPerRecipe.join('\n');
    $('#shopping-list-ingredients').val(ingredients);
  }
});
