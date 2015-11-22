Template.meal.helpers({
  parameters: function() {
    let retVal = [];
    for (let mealProperty of MEAL_PROPERTIES) {
      retVal.push({value: this[mealProperty.databaseKeyName]})
    }
    return retVal;
  }
});
