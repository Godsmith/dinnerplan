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
    When I click tonight's meal
    Then The "Name" edit control should show
    And The "Source" edit control should show
    And The "Time" edit control should show
    And The "Ingredients" edit control should show
    And The "Steps" edit control should show

  @focus
  Scenario: When a meal name that is not in the database has been created for tonight, it should be
  colored red
    Given I am a logged in user on the main page
    And I have added a meal for tonight
    Then The color of tonight's meal should be "#ba0000"

  @focus
  Scenario: When I cancel an edit it should hide the edit controls again
    Given I am a logged in user on the main page in edit mode
    When I click the "cancel" edit meal button
    Then The edit controls should not show

    @focus
      Scenario: When I insert a new row in one of the edit fields the textarea should expand
    automatically
      Given I am a logged in user on the main page in edit mode
      And The "Source" textarea has a certain height
      When I click the "Source" textarea
      And I press "Enter"
      Then The "Source" textarea has increased in height


  @focus
  Scenario: Adding a new meal to the database should change the color of the link to blue
    Given I am a logged in user on the main page that has inserted a meal into the database
    Then The color of tonight's meal should be "#0645ad"
    
  @focus
  Scenario: When adding a property to a meal in the database, that property should persist 
  when reloading the page and clicking the edit button again
    Given I am a logged in user on the main page in edit mode
    When I enter "30 min" in the Time field
    And I click the "ok" edit meal button
    And I refresh the page
    And I wait until I have been logged in
    And I click tonight's meal
    Then The Time field should say "30 min"
