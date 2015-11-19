'use strict';

Template.plan.onRendered(function() {
  $('#inputWeeksBack').on('input', function(event) {
    event.preventDefault();
    $(this).val(makeAbsoluteValueLessThan($(this).val(), MAX_WEEKS_BACK));
    updateWeeksVariable(this, 'updateWeeksBack');
  });

  $('#inputWeeksForward').on('input', function() {
    event.preventDefault();
    $(this).val(makeAbsoluteValueLessThan($(this).val(), MAX_WEEKS_FORWARD));
    updateWeeksVariable(this, 'updateWeeksForward');
  });

  function updateWeeksVariable(self, methodName) {
    Meteor.call(methodName, self.value);
    //prevent focus from shifting to the new weeks that were added
    self.focus();
  }
});

Template.plan.events({
  'input textarea': function(event, template) {
    adjustTextAreaHeight(event.target);
  }
});

Template.plan.helpers({
  weeks: function() {
    var query = Days.find({},{sort: {date: 1}});
    var daysWithMeals = query.fetch();
    var weeksBack = 2;
    var weeksForward = 1;
    if (Meteor.user()) {
      weeksBack = Meteor.user().weeksBack;
      weeksForward = Meteor.user().weeksForward;
    }
    var padding = getDaysFromWeekRange(weeksBack,weeksForward);
    var allDays = padObjectArray(daysWithMeals, padding, dateOfDayIsEqual);
    var dayChunks = allDays.chunk(7);
    var allWeeks = [];
    dayChunks.forEach(function(dayChunk) {
      allWeeks.push({days: dayChunk});
    });
    return allWeeks;
  },
  weeksDivClass: function() {
    return Session.get('displayEditMeal') ? 'hidden-xs col-sm-6 col-md-8' : 'col-xs-12';
  },
  editMealDivClass: function() {
    return Session.get('displayEditMeal') ? 'col-xs-12 col-sm-6 col-md-4' : 'hidden';
  },
  weeksBack: function() {
    if (Meteor.user()) {
      return Meteor.user().weeksBack;
    }
  },
  weeksForward: function() {
    if (Meteor.user()) {
      return Meteor.user().weeksForward;
    }
  }
});

