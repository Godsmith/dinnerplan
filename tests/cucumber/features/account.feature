Feature: Creating account and logging in and out

  As a user, I want to create an account so that I can store my data

  @focus
  Scenario: Creating an account will log me in and show my user name
    Given I am a new user
    And The main page is showing
    When I click the Sign in link
    And I click the Create account link
    And I fill in "newuser" as username
    And I fill in "password" as password
    And I click the Create account button
    Then I should see my name "newuser" on the page

   