Feature: Navigation bar using a mobile device
  As a logged out mobile user,
  The user wants to be able to navigate through the website using the hamburger menu
  So that the user can access different sections of the website

  Background:
    Given the user is on the Boost Casino homepage using a mobile device

  Scenario: Navigate through main menu items
    And the user clicks on the burger icon
    And the user should see the following menu entries
      | Home             |
      | Casino           |
      | Live Casino      |
      | Promotions       |
      | Customer Support |
    When the user selects "Customer Support" from the menu
    Then the user is redirected to the "customer-support" page

  Scenario: Navigate through Casino submenu
    And the user clicks on the burger icon
    When the user clicks on "Casino"
    Then the user should see the following casino categories
      | Popular         |
      | New             |
      | Slots           |
      | Jackpots        |
      | Buy Feature     |
      | Hot Slots       |
      | Table Games     |
      | Drops & Wins    |
      | Cash Drop       |
      | Arcade          |
      | Cluster Games   |
      | Latest Provider |
      | Exclusives      |