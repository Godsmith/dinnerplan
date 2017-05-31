@i8n
Feature: Internationalization

  As a user
  I want to be able to switch language
  So that I can use the application in my native language

  @focus
  Scenario:
    Given I am a logged in user on the main page
    And "Måndag" is shown on the page
    When I click the American flag
    Then "Monday" is shown on the page
    And "Måndag" is not shown on the page

  @focus
  Scenario:
    Given I am a logged in user on the main page
    And "Måndag" is shown on the page
    When I click the American flag
    And I refresh the page
    Then "Monday" is shown on the page
    And "Måndag" is not shown on the page
