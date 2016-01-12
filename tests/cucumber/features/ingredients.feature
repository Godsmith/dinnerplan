Feature: List recipes with a certain ingredient

  As a user
  I want to see all recipes containing a certain ingredient
  So that if I find an ingredient in the fridge or freezer, I can look up what to cook with it

  @focus
  Scenario: Adding a recipe with a certain ingredient should make it show up when searching
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I add "Tagliatelle" to the ingredients of "today"'s meal
    And I navigate to "ingredients"
    And I add "Tagliatelle" to the "#ingredient" component
    And I press "Enter"
    Then There should be "2" rows in the recipes table, including header

  @focus
  Scenario: Adding a recipe with a certain ingredient should not make it show up when searching for
    something else
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I add "Tagliatelle" to the ingredients of "today"'s meal
    And I insert "Penne con carne" as "tomorrow"'s meal
    And I add "Penne" to the ingredients of "today"'s meal
    And I navigate to "ingredients"
    And I add "Tagliatelle" to the "#ingredient" component
    And I press "Enter"
    Then There should be "2" rows in the recipes table, including header

  @focus
  Scenario: Searching is case insensitive
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I add "MiXedCASe" to the ingredients of "today"'s meal
    And I navigate to "ingredients"
    And I add "mixEdcaSE" to the "#ingredient" component
    And I press "Enter"
    Then There should be "2" rows in the recipes table, including header

  @focus
  Scenario: Clicking the search button should also work
    Given I am a logged in user on the main page that has inserted a meal into the database
    And I add "Tagliatelle" to the ingredients of "today"'s meal
    And I navigate to "ingredients"
    And I add "Tagliatelle" to the "#ingredient" component
    And I click "#ingredient-ok"
    Then There should be "2" rows in the recipes table, including header
