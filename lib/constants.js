MAX_WEEKS_BACK = 8;
MAX_WEEKS_FORWARD = 8;

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
  new MealProperty('servings', 'servings', 'inputMealServings', 'Portioner'),
  new MealProperty('time', 'textarea', 'inputMealTime', 'Tid'),
  new MealProperty('ingredients', 'textarea', 'inputMealIngredients', 'Ingredienser'),
  new MealProperty('steps', 'textarea', 'inputMealSteps', 'Steg'),
  new MealProperty('rating', 'rating', 'inputMealRating', 'Betyg'),
  new MealProperty('categories', 'categories', '', 'Kategorier')
];

CATEGORIES = [
  {value: 'Bjudmat'},
  {value: 'Fisk'},
  {value: 'Sallad'},
  {value: 'Snabblagat'},
  {value: 'Soppa'},
  {value: 'Vardagsmat'},
  {value: 'Vegetariskt'}
];

STRINGS = {
  nameAlreadyExists: 'Namnet finns redan.'
};