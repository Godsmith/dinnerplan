@editmeals
Feature: Edit meals

  As a user
  I want to create and edit meals
  So that I can easily know how to cook tonight's dinner

  @focus
  Scenario: When I click on the name of a meal it should open the edit meal view
    Given I am a logged in user on the main page
    And I have added a meal for tonight
    When I click tonight's meal
    Then The edit controls should show

  @ignore
  Scenario: When I cancel an edit it should hide the edit controls again
    Given I am a logged in user on the main page
    And I have added a meal for tonight
    And I click tonight's meal
    Then The edit controls should show
