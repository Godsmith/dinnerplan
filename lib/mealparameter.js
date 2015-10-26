class MealParameter {
  constructor(key, textareaId, label) {
    this.key = key;
    this.textareaId = textareaId;
    this.label = label;
  }
}

mealParameters = [
  new MealParameter('name', 'inputMealName', 'Name'),
  new MealParameter('source', 'inputMealSource', 'Source'),
  new MealParameter('time', 'inputMealTime', 'Time'),
  new MealParameter('ingredients', 'inputMealIngredients', 'Ingredients'),
  new MealParameter('steps', 'inputMealSteps', 'Steps')
];
