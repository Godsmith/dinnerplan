'use strict';

Template.plan.onRendered(function() {
  $('#inputFirstWeek').on('input', function(event) {
    // Sometimes you are able to select an invalid week for a certain year for some reason, e.g.
    // 2016 W53. If so, the control value will be ''. Handle this special case.
    if (this.value === '') {
      return;
    }
    let weeks = weekOffsetFromWeekString(this.value);
    Meteor.call('updateWeeksBack', -weeks);
  });

  $('#inputNumberOfWeeks').on('input', function(event) {
    $(this).val(Math.min(parseInt(this.value), MAX_NUMBER_OF_WEEKS_SHOWN));
    Meteor.call('updateNumberOfWeeks', parseInt(this.value));
  });

  // If it is week 34 and we get week 32, it should return -2
  function weekOffsetFromWeekString(weekString) {
    let year = parseInt(weekString.substr(0,4));
    let week = parseInt(weekString.substr(6));
    let moment_ = moment().year(year).week(week);
    return moment_.startOf('week').diff(moment().startOf('week'), 'weeks', true);
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
    return allWeeks;
  },
  firstWeek: function() {
    if (Meteor.user()) {
      let userWeeksBack = Meteor.user().weeksBack;
      let weeksBack = userWeeksBack != undefined ? userWeeksBack : 1;
      return weekStringFromMoment(moment().subtract(weeksBack, 'week'));
    }
  },
  numberOfWeeks: function() {
    if (Meteor.user()) {
      let userNumberOfWeeks = Meteor.user().numberOfWeeks;
      return userNumberOfWeeks != undefined ? userNumberOfWeeks : 4;
    }
  }
});

function weekStringFromMoment(moment_) {
  // Might not be compatible with all locales
  // We need to look at the Thursday of the week containing the date, since in some locales, the
  // first week of the year is the week containing the first Thursday in January.
  let thursdayOfTheSameWeek = moment_.day(4);
  return thursdayOfTheSameWeek.year() + "-W" + thursdayOfTheSameWeek.format('ww');
}

