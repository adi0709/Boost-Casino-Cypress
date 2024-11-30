Feature: Search and play a game
  As a logged-out user,
  The user wants to search for a game,
  click on it and wait for it to load

  Scenario: Search for game named book of dead
    Given the user is on the Boost Casino homepage
    And the user enters "Book of Dead" in the search box
    And the game with name "Book of Dead" is displayed
    When the play button is clicked
    Then the game starts to load
