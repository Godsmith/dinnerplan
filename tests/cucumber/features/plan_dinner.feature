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
    And I set the control with id "inputWeeksBack" to the value "0"
    And I set the control with id "inputWeeksForward" to the value "1"
    Then The number of days showing should be "14"

  @focus
  Scenario: When changing the number of weeks back to more than 8, the number should be changed
  to 8.
    Given The main page is showing
    And I am a logged in user
    And I set the control with id "inputWeeksBack" to the value "53"
    Then The control with id "inputWeeksBack" should have the value "8"

  @focus
  Scenario: When changing the number of weeks back to less than -8, the number should be
  changed
  to 8.
    Given The main page is showing
    And I am a logged in user
    And I set the control with id "inputWeeksBack" to the value "-53"
    Then The control with id "inputWeeksBack" should have the value "-8"

  @focus
  Scenario: Adding meals to days by pressing Enter
    Given The main page is showing
    And I am a logged in user
    When I click the edit button for "today"'s meal
    And I insert "Korv Stroganoff" in "today"'s text box
    And I press "Enter"
    Then I should see "Korv Stroganoff" on the page

  @focus
  Scenario: Adding meals to days by clicking the ok button
    Given The main page is showing
    And I am a logged in user
    When I click the edit button for "today"'s meal
    And I insert "Korv Stroganoff" in "today"'s text box
    And I click the "ok" button for "today"'s meal
    Then I should see "Korv Stroganoff" on the page

  @focus
  Scenario: Canceling when adding a meal by pressing Enter
    Given The main page is showing
    And I am a logged in user
    When I click the edit button for "today"'s meal
    And I insert "Korv Stroganoff" in "today"'s text box
    And I click the "cancel" button for "today"'s meal
    Then There shouldn't be any link to today's meal

  @focus
  Scenario: Editing an existing planned meal for a day
    Given The main page is showing
    And I am a logged in user
    When I click the edit button for "today"'s meal
    And I insert "Korv Stroganoff" in "today"'s text box
    And I click the "ok" button for "today"'s meal
    And I click the edit button for "today"'s meal
    And I insert "Pasta Carbonara" in "today"'s text box
    And I click the "ok" button for "today"'s meal
    Then I should see "Pasta Carbonara" on the page

    @focus
    Scenario: Editing a two-row meal name should bring up a two-row editing button
      Given I am a logged in user on the main page
      And I have added "Text that spans over two rows" for tonight
      And I refresh the page
      And I click the edit button for "today"'s meal
      Then The height of today's textarea should be "54" pixels

  @focus
  Scenario: Creating a meal consisting just of spaces should not add an entry to the database
    Given I am a logged in user on the main page
    When I click the edit button for "today"'s meal
    And I insert "        " in "today"'s text box
    And I click the "ok" button for "today"'s meal
    Then There shouldn't be any meals in the database

  @temp
  @focus
  Scenario: When an edit button is in focus and tab is pressed, the cursor should move to the next
    edit button
    Given I am a logged in user on the main page
    When I select "today"'s edit button
    And I press "Tab"
    Then "tomorrow"'s edit button should be selected


