getMealProperties = function () {

  class MealProperty {
    constructor(key, type, htmlId, label, showInList) {
      this.databaseKeyName = key;
      this.type = type;
      this.htmlId = htmlId;
      this.label = label;
      this.showInList = showInList;
    }
  }

  return [
    new MealProperty('name', 'textarea', 'inputMealName', 'Namn', true),
    new MealProperty('source', 'textarea', 'inputMealSource', 'Källa', false),
    new MealProperty('servings', 'servings', 'inputMealServings', 'Portioner', false),
    new MealProperty('time', 'textarea', 'inputMealTime', 'Tid', true),
    new MealProperty('ingredients', 'textarea', 'inputMealIngredients', 'Ingredienser', false),
    new MealProperty('steps', 'textarea', 'inputMealSteps', 'Steg', false),
    new MealProperty('rating', 'rating', 'inputMealRating', 'Betyg', true),
    new MealProperty('categories', 'categories', 'inputMealCategories', 'Kategorier', false),
    new MealProperty('comments', 'comments', 'inputMealComments', 'Kommentarer', false)
  ];
};

getMealPropertiesToShowInList = function () {
  return getMealProperties().filter((p) => p.showInList);
};