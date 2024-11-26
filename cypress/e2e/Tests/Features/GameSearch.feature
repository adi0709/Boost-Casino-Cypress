Feature: The user want to access the site and search for a game

  Scenario: Search for game named "book of dead"
    Given the user navigates to the website
    And the user enters "Book of Dead" in the search box
    And the game with name "book of dead" is displayed
    When the play button is clicked
    Then the game starts to load
