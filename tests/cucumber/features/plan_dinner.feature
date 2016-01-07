Feature: Creating account and logging in and out

  As a user
  I want to plan my dinners
  So that I can use the core functionality of the site

  @focus
  Scenario: By default, the plan page should show four weeks total
    Given I am a logged in user on the main page
    Then The input box with id "inputNumberOfWeeks" should have the value "4"
    And The number of days showing should be "28"

  @focus
  Scenario: When choosing to show 2 weeks, the number of days showing should be 14
    Given I am a logged in user on the main page
    And I set the control with id "inputNumberOfWeeks" to the value "2"
    Then The number of days showing should be "14"

  # This test will fail when the selected week happens to be 53, since some years do not have a
  # week 53
  @focus
  Scenario: When changing the start week and the number of weeks shown, those changes should
  persist after a page reload
    Given I am a logged in user on the main page
    When I send two up arrows to the "inputFirstWeek" control and record the value
    And I set the control with id "inputNumberOfWeeks" to the value "2"
    And I refresh the page
    Then The input box with id "inputFirstWeek" should still have the recorded value
    Then The input box with id "inputNumberOfWeeks" should have the value "2"

  @focus
  Scenario: When changing the number of weeks shown to more than 12, the number should be
  changed to 12.
    Given I am a logged in user on the main page
    And I set the control with id "inputNumberOfWeeks" to the value "53"
    Then The control with id "inputNumberOfWeeks" should have the value "12"

  @focus
  Scenario: Adding meals to days by pressing Enter
    Given I am a logged in user on the main page
    When I click the edit button for "today"'s meal
    And I insert "Korv Stroganoff" in "today"'s text box
    And I press "Enter"
    Then The text of "today"'s meal should be "Korv Stroganoff"

  @focus
  Scenario: Canceling when adding a meal by pressing Enter
    Given The main page is showing
    And I am a logged in user
    When I click the edit button for "today"'s meal
    And I insert "Korv Stroganoff" in "today"'s text box
    And I click the "cancel" button for "today"'s meal
    Then There shouldn't be any link to today's meal
    And There shouldn't be meals for any days in the database

  @focus
  Scenario: Editing an existing planned meal for a day
    Given The main page is showing
    And I am a logged in user
    When I click the edit button for "today"'s meal
    And I insert "Korv Stroganoff" in "today"'s text box
    And I press "Enter"
    And I click the edit button for "today"'s meal
    And I insert "Pasta Carbonara" in "today"'s text box
    And I press "Enter"
    Then The text of "today"'s meal should be "Pasta Carbonara"

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
    And I press "Enter"
    Then There shouldn't be any link to today's meal
    And There shouldn't be meals for any days in the database

  @focus
  Scenario: Deleting the text in a planned meal field should remove the meal from that day
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I click the edit button for "today"'s meal
    And I insert "" in "today"'s text box
    And I press "Enter"
    Then There shouldn't be any link to today's meal
    And There shouldn't be meals for any days in the database

  @focus
  Scenario: When an edit button is in focus and tab is pressed, the cursor should move to the next
    edit button
    Given I am a logged in user on the main page
    When I select "today"'s edit button
    And I press "Tab"
    Then "tomorrow"'s edit button should be selected


