Days = new Mongo.Collection('days');

// TODO: move this somewhere better. Note that it is a global function, so it can be accessed
// by meteor from everywhere
getDays = function(daysBack, daysForward) {
  var days = [];
  for (var i =-daysBack; i <= daysForward; i++) {
    var date = moment().utc().add(i, 'days').startOf('day').format('YYYY-MM-DD');
    days.push({date: date})
  }
  return days;
};

getDaysFromWeekRange = function(weeksBack, weeksForward) {
  var days = [];
  for (var i=-weeksBack; i<=weeksForward; i++) {
    for (var j=1; j<=7; j++) {
      var date = moment().isoWeekday(i*7+j).startOf('day').format('YYYY-MM-DD');
      days.push({date: date});
    }
  }
  return days;
};

padObjectArray = function(originalArray, padObjects, compareFunction) {
  var retVal = padObjects.slice();
  originalArray.forEach(function(originalObject) {
    for (var i = 0; i < padObjects.length; i++) {
      if (compareFunction(originalObject, padObjects[i])) {
        retVal[i] = originalObject;
        break;
      }
    }
  });
  return retVal;
};

dateOfDayIsEqual = function(day1, day2){
  return day1.date === day2.date;
};
