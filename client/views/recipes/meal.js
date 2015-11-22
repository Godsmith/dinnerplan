Template.meal.helpers({
  parameters: function() {
    let retVal = [];
    for (let mealParameter of MEAL_PARAMETERS) {
      retVal.push({value: this[mealParameter.databaseKeyName]})
    }
    return retVal;
  }
});
