Meals = new Mongo.Collection('meals');

class MealParameter {
  constructor(key, type, htmlId, label) {
    this.databaseKeyName = key;
    this.type = type;
    this.htmlId = htmlId;
    this.label = label;
  }
}

mealParameters = [
  new MealParameter('name', 'textarea', 'inputMealName', 'Namn'),
  new MealParameter('source', 'textarea', 'inputMealSource', 'Källa'),
  new MealParameter('time', 'textarea', 'inputMealTime', 'Tid'),
  new MealParameter('ingredients', 'textarea', 'inputMealIngredients', 'Ingredienser'),
  new MealParameter('steps', 'textarea', 'inputMealSteps', 'Steg'),
  new MealParameter('rating', 'rating', 'inputMealRating', 'Betyg')
];
