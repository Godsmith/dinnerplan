Template.recipesTable.helpers({
  mealProperties: function() {
    return getMealPropertiesToShowInList();
  }
});

Template.recipesTable.onRendered(function() {
  $('#recipes').DataTable( {
    "paging": false,
    "info": false,
    "searching": false
  });
});
