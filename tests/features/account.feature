Feature: Creating account and logging in and out

  As a user, I want to create an account so that I can store my data

  @focus
  @temp
  Scenario: Creating an account will log me in and show my user name
    Given The main page is showing
    When I click the Sign in link
    And I click the Create account link
    And I fill in "newuser" as username
    And I fill in "password" as password
    And I click the Create account button
    Then I should see my name "newuser" on the page

  @focus
  Scenario: After logging out of my account, "Sign in" should be shown again
    Given I am a logged in user on the main page
    When I click my username
    And I click the Sign out button
    Then I should see "Sign in" on the page again