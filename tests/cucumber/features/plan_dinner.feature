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

  @ignore
  Scenario: Adding meals to days
    Given The main page is showing
    And I am a logged in user
    When I click an edit button
    And I fill in text "Korv Stroganoff" in the text box
    And I press Enter
    Then I should see "Korv Stroganoff" on the page