@editmeals
Feature: Edit meals

  As a user
  I want to create and edit meals
  So that I can easily know how to cook tonight's dinner

  @focus
  Scenario: Do not show the edit buttons by default
    Given I am a logged in user on the main page
    Then The edit controls should not show

  @focus
  Scenario: When I click on the name of a meal it should open the edit meal view
    Given I am a logged in user on the main page
    And I have added a meal for tonight
    When I click "today"'s meal
    Then The "Name" edit control should show
    And The "Source" edit control should show
    And The "Time" edit control should show
    And The "Ingredients" edit control should show
    And The "Steps" edit control should show
    And The "Comments" edit control should show

  @focus
  Scenario: When I click on the name of a meal that does not exist in the database the name of that
  meal should be shown in the edit meal view
    Given I am a logged in user on the main page
    And I have added "Korv Stroganoff" for tonight
    When I click "today"'s meal
    Then The text of the "Name" textbox should be "Korv Stroganoff"

  @focus
  Scenario: When I click on the name of a meal that does exist in the database the name of that
  meal should be shown in the edit meal view
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I click "today"'s meal
    Then The component "div.meal-property" should show

  @focus
  Scenario: Remove leading and trailing whitespace in meal names
    Given I am a logged in user on the main page
    And I have added "    Korv Stroganoff  " for tonight
    When I click "today"'s meal
    Then The text of the "Name" textbox (without stripping spaces) should be "Korv Stroganoff"

  @focus
  Scenario: When a meal name that is not in the database has been created for tonight, it should be
  colored red
    Given I am a logged in user on the main page
    And I have added a meal for tonight
    Then The color of tonight's meal should be "#ba0000"

  @focus
  Scenario: When I cancel an edit it should hide the edit controls again
    Given I am a logged in user on the main page in edit mode
    When I click the "cancel" edit meal button and wait for the dialog to close
    Then The edit controls should not show

  @focus
  Scenario: When I press the back button the edit controls should disappear
    Given I am a logged in user on the main page in edit mode
    When I click the back button in the browser
    Then The edit controls should not show

  @focus
  Scenario: When I insert a new row in one of the edit fields the textarea should expand
  automatically
    Given I am a logged in user on the main page in edit mode
    And The "Source" textarea has a certain height
    When I click the "Source" textarea
    And I enter two lines of text
    Then The "Source" textarea has increased in height

  @focus
  Scenario: If I have inserted a double row in an edit field and then close and reopen the
    editMeal dialog, the double row should persist
    Given I am a logged in user on the main page in edit mode
    And The "Ingredients" textarea has a certain height
    When I click the "Ingredients" textarea
    And I enter two lines of text
    And I click the "ok" edit meal button and wait for the dialog to close
    And I click "today"'s meal
    And I click the "edit" edit meal button
    Then The "Ingredients" textarea has increased in height

  @focus
  Scenario: If I have inserted a double row in an edit field and switch to another edit dialog
  and back again, the double row should persist
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I insert "Fiskpudding" as "tomorrow"'s meal
    And I click "tomorrow"'s meal
    And I click the "Ingredients" textarea
    And I enter two lines of text
    And I click the "ok" edit meal button and wait for the dialog to close
    And I click "today"'s meal
    And I click the "edit" edit meal button
    And The "Ingredients" textarea has a certain height
    And I click the "cancel" edit meal button and wait for the dialog to close
    And I click "tomorrow"'s meal
    And I click the "edit" edit meal button
    Then The "Ingredients" textarea has increased in height

  @focus
  Scenario: Adding a new meal to the database should change the color of the link to blue
    Given I am a logged in user on the main page that has inserted a meal into the database
    Then The color of tonight's meal should be "#0645ad"

  @focus
  Scenario: The blue color of a meal should persist even when logging out and in again
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I log out
    And I refresh the page
    And I log in
    Then The color of tonight's meal should be "#0645ad"

  @focus
  Scenario: When adding a property to a meal in the database, that property should persist 
  when reloading the page and clicking the edit button again
    Given I am a logged in user on the main page in edit mode
    When I enter "30 min" in the "Time" field
    And I select "2" servings
    And I click the first rating button
    And I enter "Soppa" in the selectize field
    And I click the "ok" edit meal button and wait for the dialog to close
    And I refresh the page
    And I wait until I have been logged in
    And I click "today"'s meal
    And I click the "edit" edit meal button
    Then The text of the "Time" textbox should be "30 min"
    And "2" servings should be selected
    And The first rating button should be pressed
    And The selectize field should contain an entry "Soppa"

  @focus
  Scenario: When clicking a recipe with an empty field after clicking a recipe with some
  filled-in fields, all the empty fields should be shown as empty
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I insert "another meal name" as "tomorrow"'s meal
    And I click "tomorrow"'s meal
    And I enter "30 min" in the "Time" field
    And I click the "ok" edit meal button and wait for the dialog to close
    And I click "today"'s meal
    And I click the "edit" edit meal button
    Then The text of the "Time" textbox should be ""

  @focus
  Scenario: When filling in a field and then switching recipe without saving, the field should be
  cleared
    Given I am a logged in user on the main page in edit mode
    When I enter "30 min" in the "Time" field
    And I click the "ok" edit meal button and wait for the dialog to close
    And I insert "another meal name" as "tomorrow"'s meal
    And I click "tomorrow"'s meal
    Then The text of the "Time" textbox should be ""

  @focus
  Scenario: When changing the name of a recipe, all recipes with that name in the week view should
    also change name
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I have inserted the same meal for tomorrow
    When I click "today"'s meal
    And I click the "edit" edit meal button
    And I enter "new name" in the "Name" field
    And I click the "ok" edit meal button and wait for the dialog to close
    Then The text of "today"'s meal should be "new name"
    And The text of "tomorrow"'s meal should be "new name"

  @focus
  Scenario: When changing the name of a recipe, the old recipe name should no longer exist
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I have inserted the same meal for tomorrow
    When I click "today"'s meal
    And I click the "edit" edit meal button
    And I enter "new name" in the "Name" field
    And I click the "ok" edit meal button and wait for the dialog to close
    And I insert "meal name" as "today"'s meal
    Then The color of tonight's meal should be "#ba0000"

  @focus
  Scenario: You should not be able to change a recipe name to an existing recipe name.
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I insert "meal name 2" as "tomorrow"'s meal
    And I click "tomorrow"'s meal
    And I enter "meal name" in the "Name" field
    And I click the "ok" edit meal button
    Then The "Name" edit control should show

  @focus
  Scenario: You should not be able to change a recipe name to a string with only whitespace
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I insert "meal name 2" as "tomorrow"'s meal
    And I click "today"'s meal
    And I click the "edit" edit meal button
    And I enter "" in the "Name" field
    And I click the "ok" edit meal button
    Then The "Name" edit control should show

  @focus
  Scenario: After adding a comment, it should show with today's date.
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I click "today"'s meal
    And I click the "edit" edit meal button
    And I enter "my comment" in the "Comments" field
    And I click the "ok" edit meal button
    Then The comments of today's meal should show today's date and "my comment"

  @focus
  Scenario: HTML in comments should be escaped
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I add a comment for today's meal with the comment "<br>"
    Then The comments of today's meal should show today's date and "&lt;br&gt;"

  @focus
  Scenario: Adding an empty comment should not add a new comment and should not remove the old one
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I add a comment for today's meal with the comment "my comment"
    When I add a comment for today's meal with the comment ""
    Then The comments of today's meal should show today's date exactly once

  @focus
  Scenario: When adding a URL in the link field in a recipe, that link should show up as an HTML
  link.
    Given I am a logged in user on the main page in edit mode
    When I enter "a.com" in the "Source" field
    And I click the "ok" edit meal button
    And I click "today"'s meal
    Then The component ".editMeal" should include the HTML ">a.com</a>"

  @focus
  Scenario: The same recipe name should be able to be used by different users without conflict
    Given There are users named "Bill" and "Ted"
    And "Bill" has inserted a recipe "Pannkakor" in the database with "Time" "60 min"
    And "Ted" has inserted a recipe "Pannkakor" in the database with "Time" "30 min"
    And "Bill"'s recipe "Pannkakor" should have "Time" "60 min"
    Then "Ted"'s recipe "Pannkakor" should have "Time" "30 min"
