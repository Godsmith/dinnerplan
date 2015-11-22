Meals = new Mongo.Collection('meals');

class MealProperty {
  constructor(key, type, htmlId, label) {
    this.databaseKeyName = key;
    this.type = type;
    this.htmlId = htmlId;
    this.label = label;
  }
}

MEAL_PROPERTIES = [
  new MealProperty('name', 'textarea', 'inputMealName', 'Namn'),
  new MealProperty('source', 'textarea', 'inputMealSource', 'Källa'),
  new MealProperty('time', 'textarea', 'inputMealTime', 'Tid'),
  new MealProperty('ingredients', 'textarea', 'inputMealIngredients', 'Ingredienser'),
  new MealProperty('steps', 'textarea', 'inputMealSteps', 'Steg'),
  new MealProperty('rating', 'rating', 'inputMealRating', 'Betyg')
];
