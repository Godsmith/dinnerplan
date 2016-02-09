MAX_NUMBER_OF_WEEKS_SHOWN = 12;
DEFAULT_WEEKS_BACK = 2;
DEFAULT_WEEKS_FORWARD = 1;

class MealProperty {
  constructor(key, type, htmlId, label, showInList) {
    this.databaseKeyName = key;
    this.type = type;
    this.htmlId = htmlId;
    this.label = label;
    this.showInList = showInList;
  }
}

MEAL_PROPERTIES = [
  new MealProperty('name', 'textarea', 'inputMealName', 'Namn', true),
  new MealProperty('source', 'textarea', 'inputMealSource', 'Källa', false),
  new MealProperty('servings', 'servings', 'inputMealServings', 'Portioner', false),
  new MealProperty('time', 'textarea', 'inputMealTime', 'Tid', true),
  new MealProperty('ingredients', 'textarea', 'inputMealIngredients', 'Ingredienser', false),
  new MealProperty('steps', 'textarea', 'inputMealSteps', 'Steg', false),
  new MealProperty('rating', 'rating', 'inputMealRating', 'Betyg', true),
  new MealProperty('categories', 'categories', '', 'Kategorier', false),
  new MealProperty('comments', 'comments', 'inputMealComments', 'Kommentarer', false)
];

MEAL_PROPERTIES_TO_SHOW_IN_LIST = MEAL_PROPERTIES.filter((p) => p.showInList);

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
  nameAlreadyExists: 'Namnet finns redan.',
  nameEmptyString: 'Namnet är ogiltigt.'
};