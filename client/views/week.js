Template.week.helpers({
  days: function() {
    return this.days;
  },
  weekDivClass: function() {
    return Session.get('displayEditMeal') ? 'col-md-6' : "col-lg-4 col-sm-6";
  }
});
