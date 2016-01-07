Feature: List recipes per category

  As a user
  I want to see all recipes in a certain category
  So that I can select one vegetarian recipe, for example

  @focus
  Scenario: Adding a recipe with a certain category should make it show up in that category on the 
  categories page
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I add the "Fisk" category to "today"'s meal
    And I navigate to "categories"
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
    And I navigate to "categories"
    And I click ".category.Fisk"
    Then There should be "2" rows in the recipes table, including header



