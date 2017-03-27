Template.meal.helpers({
  parameters: function() {
    let retVal = [];
    for (let mealProperty of getMealPropertiesToShowInList()) {
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
