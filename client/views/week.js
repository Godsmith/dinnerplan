'use strict';

Template.week.helpers({
  days() {
    return this.days
  },
  weekDivClass: () => Session.get('displayEditMeal') ? 'col-md-6' : "col-lg-4 col-sm-6"
});
