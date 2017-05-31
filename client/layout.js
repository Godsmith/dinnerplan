Template.layout.helpers({
  activeIs: function(tabName) {
    return tabName == this.active;
  }
});

Template.layout.onRendered(function() {
  this.autorun(function(c) {
    let user = Meteor.user();
    if (user && user.language) {
      i18n.setLanguage(user.language);
      c.stop()
    }
  })
});

Template.layout.events({
  'input textarea': function(event, template) {
    adjustTextAreaHeight(event.target);
  },

  'click #flag-se': function(event, template) {
    i18n.setLanguage('sv_SE');
    Meteor.call('setUserLanguage', 'sv_SE')
  },

  'click #flag-us': function(event, template) {
    i18n.setLanguage('en_US');
    Meteor.call('setUserLanguage', 'en_US')
  }

});


