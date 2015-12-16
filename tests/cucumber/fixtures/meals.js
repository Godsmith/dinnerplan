( function () {

  'use strict';

  Meteor.methods({
    hasRecipes: function() {
      // find({}) crashes with RangeError: Maximum call stack size exceeded
      //return Meals.find({}).fetch().length
      console.log(Meals.findOne());
      return Meals.findOne() != null
    }
  });
})();