Template.layout.helpers({
  activeIs: function(tabName) {
    return tabName == this.active;
  }
});

Template.layout.events({
  'input textarea': function(event, template) {
    adjustTextAreaHeight(event.target);
  },

  'click #flag-se': function(event, template) {
    i18n.setLanguage('sv_SE');
  },

  'click #flag-us': function(event, template) {
    i18n.setLanguage('en_US');
  }

});
