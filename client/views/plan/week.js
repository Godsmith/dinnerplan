'use strict';

Template.week.helpers({
  days() {
    return this.days
  },

  current() {
    return this.current ? 'current' : '';
  }
});
