class MealParameter {
  constructor(key, textareaId, textareaLabel) {
    this.key = key;
    this.textareaId = textareaId;
    this.textareaLabel = textareaLabel;
  }
}

mealParameters = [
  new MealParameter('name', 'inputMealName', 'Name'),
  new MealParameter('source', 'inputMealSource', 'Source'),
  new MealParameter('time', 'inputMealTime', 'Time'),
  new MealParameter('ingredients', 'inputMealIngredients', 'Ingredients'),
  new MealParameter('steps', 'inputMealSteps', 'Steps')
];
