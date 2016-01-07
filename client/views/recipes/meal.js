Template.meal.helpers({
  parameters: function() {
    let retVal = [];
    for (let mealProperty of MEAL_PROPERTIES_TO_SHOW_IN_LIST) {
      retVal.push(
        {
          value: this[mealProperty.databaseKeyName],
          isName: mealProperty.databaseKeyName === 'name'
        }
      );
    }
    return retVal;
  }
});
