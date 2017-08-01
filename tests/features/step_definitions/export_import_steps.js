/**
 * Created by Filip on 2017-08-01.
 */

function tryParseJSON (jsonString){
  try {
    var o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
      return true;
    }
  }
  catch (e) { }

  return false;
}

module.exports = function () {
  this.Then(/^The control "([^"]*)" should contain the string "([^"]*)"$/, function (selector, string) {
    //The waitForText function does not work for some reason, so I'm replicating it below.
    //browser.waitForText(selector);
    var self = this;
    browser.waitUntil(function() {
      return self.support.getValueOfSelector(selector) != '';
    });
    var text = this.support.getValueOfSelector(selector);
    expect(text.includes(string)).toBe(true);
  });

  this.Then(/^The control "([^"]*)" contains valid JSON$/, function (selector) {
    var text = this.support.getValueOfSelector(selector);
    expect(tryParseJSON(text)).toBe(true);
  });
};
