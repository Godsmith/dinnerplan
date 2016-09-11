'use strict';

Template.plan.onRendered(function() {
  $('#inputFirstWeek').on('input', function(event) {
    Meteor.call('updateWeeksBack', parseInt(this.value));
  });

  $('#inputNumberOfWeeks').on('input', function(event) {
    $(this).val(Math.min(parseInt(this.value), MAX_NUMBER_OF_WEEKS_SHOWN));
    Meteor.call('updateNumberOfWeeks', parseInt(this.value));
  });
});

Template.plan.helpers({
  weeks: function() {
    var query = Days.find({},{sort: {date: 1}});
    var daysWithMeals = query.fetch();
    var weeksBack = DEFAULT_WEEKS_BACK;
    var weeksForward = DEFAULT_WEEKS_FORWARD;
    if (Meteor.user()) {
      weeksBack = Meteor.user().weeksBack != undefined ? Meteor.user().weeksBack : DEFAULT_WEEKS_BACK;
      let numberOfWeeks = Meteor.user().numberOfWeeks != undefined ? Meteor.user().numberOfWeeks : 4;
      weeksForward = parseInt(numberOfWeeks) - weeksBack - 1;
    }
    var padding = getDaysFromWeekRange(weeksBack,weeksForward);
    var allDays = padObjectArray(daysWithMeals, padding, dateOfDayIsEqual);
    var dayChunks = allDays.chunk(7);
    var allWeeks = [];
    dayChunks.forEach(function(dayChunk) {
      allWeeks.push({days: dayChunk});
    });

    let indexOfCurrentWeek = weeksBack;
    if (indexOfCurrentWeek >= 0 && indexOfCurrentWeek < allWeeks.length) {
      allWeeks[indexOfCurrentWeek].current = true;
    }
    return allWeeks;
  },
  firstWeek: function() {
    if (Meteor.user()) {
      let userWeeksBack = Meteor.user().weeksBack;
      return userWeeksBack != undefined ? userWeeksBack : 0;
    }
  },
  numberOfWeeks: function() {
    if (Meteor.user()) {
      let userNumberOfWeeks = Meteor.user().numberOfWeeks;
      return userNumberOfWeeks != undefined ? userNumberOfWeeks : 4;
    }
  }
});
