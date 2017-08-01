@export_import
Feature: Exporting and importing recipes

  As a user
  I want to be able to export and import a list of recipes in JSON format
  So that I can backup my recipes

  @focus
  Scenario: Clicking the export button on the Tools page should show the recipes in JSON format
    Given I am a logged in user on the main page that has inserted a meal into the database
    When I navigate to "tools"
    And I click "#exportButton"
    Then The control "#exportTextarea" should contain the string "meal name"
    And The control "#exportTextarea" contains valid JSON
