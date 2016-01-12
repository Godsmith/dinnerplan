Template.layout.helpers({
  activeIs: function(tabName) {
    return tabName == this.active;
  }
});

Template.layout.events({
  'input textarea': function(event, template) {
    adjustTextAreaHeight(event.target);
  }
});
