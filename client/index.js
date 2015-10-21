Template.body.helpers({
  weeks: function() {
    var query = Days.find({},{sort: {date: 1}});
    var daysWithMeals = query.fetch();
    var padding = getDaysFromWeekRange(1,2);
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
  }
});

Template.body.onRendered = function() {
  $('textarea').each(function () {
    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    console.log('textarea fixed')
  }).on('input propertychange', function () {
    adjustTextAreaHeight(this);
  });
};
