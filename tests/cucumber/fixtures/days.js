( function () {

  'use strict';

  Meteor.methods({
    hasMeals: function() {
      // find({}) crashes with RangeError: Maximum call stack size exceeded
      //return Meals.find({}).fetch().length
      return Days.findOne() != null
    }
  });
})();