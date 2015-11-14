Feature: Creating account and logging in and out

  As a user
  I want to plan my dinners
  So that I can use the core functionality of the site

  @focus
  Scenario: By default, the plan page should show 2 weeks back and 1 week forward
    Given The main page is showing
    And I am a logged in user
    Then The input box with id "inputWeeksBack" should have the value "1"
    And The input box with id "inputWeeksForward" should have the value "2"
    And The number of days showing should be "28"

  @focus
  Scenario: When changing it to 0 week back and 1 weeks forward, the number of days showing
  should be 14
    Given The main page is showing
    And I am a logged in user
    And The control with id "inputWeeksBack" is set to the value "0"
    And The control with id "inputWeeksForward" is set to the value "1"
    Then The number of days showing should be "14"

  @focus
  Scenario: Adding meals to days by pressing Enter
    Given The main page is showing
    And I am a logged in user
    When I click an edit button
    And I fill in text "Korv Stroganoff" in the text box
    And I press "Enter"
    Then I should see "Korv Stroganoff" on the page

  @focus
  Scenario: Adding meals to days by clicking the ok button
    Given The main page is showing
    And I am a logged in user
    When I click an edit button
    And I fill in text "Korv Stroganoff" in the text box
    And I click the ok button
    Then I should see "Korv Stroganoff" on the page

  @focus
  Scenario: Canceling when adding a meal by pressing Enter
    Given The main page is showing
    And I am a logged in user
    When I click an edit button
    And I fill in text "Korv Stroganoff" in the text box
    And I click the cancel button
    Then I should see "" on the page

  @focus
  Scenario: Editing an existing planned meal for a day
    Given The main page is showing
    And I am a logged in user
    When I click an edit button
    And I fill in text "Korv Stroganoff" in the text box
    And I click the ok button
    And I click an edit button
    And I fill in text "Pasta Carbonara" in the text box
    And I click the ok button
    Then I should see "Pasta Carbonara" on the page
