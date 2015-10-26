Template.meal.helpers({
  parameters: function() {
    let retVal = [];
    for (let mealParameter of mealParameters) {
      retVal.push({value: this[mealParameter.key]})
    }
    return retVal;
  }
});
