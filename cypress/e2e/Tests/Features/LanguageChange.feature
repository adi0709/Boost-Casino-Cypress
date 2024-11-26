Feature: Language switch functionality
  As a logged-out user,
  The user wants to switch languages using the language menu dropdown,
  So that the user can view the website in preferred language.

  Scenario Outline: Switching language using the dropdown
    Given the user is on the Boost Casino homepage
    When the user opens the language dropdown
    And the user select the "<language>" language option
    Then the user should see the page content in "<languageValue>"
    And login text reads "<loginText>"
    And the url has "<language>" in the url

    Examples:
      | language | languageValue | loginText    |
      | FI       | fi            | Kirjaudu     |
      | EE       | et            | Logi sisse   |
      | RU       | ru            | Зайти в игру |