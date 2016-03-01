@viewrecipes
Feature: View recipes

  As a user
  I want to view all my recipes
  So that I can choose what to cook for dinner

  @focus
  Scenario: All the column headers should show in the recipes tab
    Given I navigate to "recipes"
    And I am a logged in user
    Then The "Name" column header should be visible

  @focus
  Scenario: After a recipe has been inserted into the database, a recipe row should be visible in
  the column
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I navigate to "recipes"
    Then There should be "2" rows in the recipes table, including header

  @focus
  Scenario: After a recipe has been inserted into the database, there should be a link with the
  recipe name on the recipes page
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I navigate to "recipes"
    Then The component "a.edit-meal" should include the HTML "meal name"

  @focus
  Scenario: Clicking a recipe on the recipes page should bring up the edit meal dialog
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I navigate to "recipes"
    And I click ".edit-meal"
    Then The component "div.meal-property" should show
