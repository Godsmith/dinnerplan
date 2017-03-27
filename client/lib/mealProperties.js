getMealProperties = function () {

  class MealProperty {
    constructor(key, type, htmlId, showInList) {
      this.databaseKeyName = key;
      this.type = type;
      this.htmlId = htmlId;
      this.label = i18n('mealProperty.' + key);
      this.showInList = showInList;
    }
  }

  return [
    new MealProperty('name', 'textarea', 'inputMealName', true),
    new MealProperty('source', 'textarea', 'inputMealSource', false),
    new MealProperty('servings', 'servings', 'inputMealServings', false),
    new MealProperty('time', 'textarea', 'inputMealTime', true),
    new MealProperty('ingredients', 'textarea', 'inputMealIngredients', false),
    new MealProperty('steps', 'textarea', 'inputMealSteps', false),
    new MealProperty('rating', 'rating', 'inputMealRating', true),
    new MealProperty('categories', 'categories', 'inputMealCategories', false),
    new MealProperty('comments', 'comments', 'inputMealComments', false)
  ];
};

getMealPropertiesToShowInList = function () {
  return getMealProperties().filter((p) => p.showInList);
};