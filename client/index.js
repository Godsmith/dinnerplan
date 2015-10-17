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
  }
});

