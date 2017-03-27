MAX_NUMBER_OF_WEEKS_SHOWN = 12;
DEFAULT_WEEKS_BACK = 2;
DEFAULT_WEEKS_FORWARD = 1;

CATEGORIES = [
  {htmlText: 'Alla', databaseLookupString: ''},
  {htmlText: 'Bjudmat', databaseLookupString: 'Bjudmat'},
  {htmlText: 'Fisk', databaseLookupString: 'Fisk'},
  {htmlText: 'Sallad', databaseLookupString: 'Sallad'},
  {htmlText: 'Snabblagat', databaseLookupString: 'Snabblagat'},
  {htmlText: 'Soppa', databaseLookupString: 'Soppa'},
  {htmlText: 'Vardagsmat', databaseLookupString: 'Vardagsmat'},
  {htmlText: 'Vegetariskt', databaseLookupString: 'Vegetariskt'}
];

CATEGORIES_EXCEPT_ALL = CATEGORIES.filter((c) => c.databaseLookupString !== '');

STRINGS = {
  nameAlreadyExists: 'Namnet finns redan.',
  nameEmptyString: 'Namnet är ogiltigt.'
};