Feature: List recipes per category

  As a user
  I want to see all recipes in a certain category
  So that I can select one vegetarian recipe, for example

  @focus
  Scenario: Adding a recipe with a certain category should make it show up in that category on the 
  categories page
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I add the "Fisk" category to "today"'s meal
    And I navigate to "recipes"
    And I click ".category.Fisk"
    Then There should be "2" rows in the recipes table, including header

  @focus
  Scenario: Adding a recipe with a certain category should not make it show up in any other category
  on the categories page
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I insert "Gravad lax" as "tomorrow"'s meal
    And I add the "Fisk" category to "today"'s meal
    And I add the "Soppa" category to "today"'s meal
    And I add the "Soppa" category to "tomorrow"'s meal
    And I navigate to "recipes"
    And I click ".category.Fisk"
    Then There should be "2" rows in the recipes table, including header

  @focus
  Scenario: When clicking one of the recipes, the previously active category should still be active
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I add the "Fisk" category to "today"'s meal
    And I navigate to "recipes"
    And I click ".category.Fisk"
    And I click "a.edit-meal"
    When I click the "cancel" edit meal button and wait for the dialog to close
    Then There should be "2" rows in the recipes table, including header

  @focus
  Scenario: When clicking one of the recipes, in the edit meal dialog that comes up, the
  textareas should resize automatically when typing
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I add the "Fisk" category to "today"'s meal
    And I navigate to "recipes"
    And I click ".category.Fisk"
    And I click "a.edit-meal"
    And I click the "edit" edit meal button
    And The "Source" textarea has a certain height
    And I click the "Source" textarea
    And I enter two lines of text
    Then The "Source" textarea has increased in height

  @focus
  Scenario: The "Alla" category that includes all recipes should show up by default
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I insert "Gravad lax" as "tomorrow"'s meal
    And I add the "Fisk" category to "today"'s meal
    And I add the "Soppa" category to "tomorrow"'s meal
    And I add the "Fisk" category to "today"'s meal
    And I navigate to "recipes"
    Then There should be "3" rows in the recipes table, including header

  @focus
  Scenario: When going to a specific category and back to the "Alla" category, all meals shall
  show up again
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I insert "Gravad lax" as "tomorrow"'s meal
    And I add the "Fisk" category to "today"'s meal
    And I add the "Soppa" category to "tomorrow"'s meal
    And I navigate to "recipes"
    And I click ".category.Fisk"
    And I click ".category.Alla"
    Then There should be "3" rows in the recipes table, including header
