/**
 * Created by Filip on 2017-07-31.
 */

Template.tools.events({
  'click #exportButton'() {
    Meteor.call('getAllRecipes', function(error, result) {
      console.log(result);
      $('#exportTextarea').val(JSON.stringify(result, null, '  '));
    });
  }
});