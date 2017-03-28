getMealCategories = function () {
  return [
    {htmlText: 'Alla', databaseLookupString: ''},
    {htmlText: 'Bjudmat', databaseLookupString: 'Bjudmat'},
    {htmlText: 'Fisk', databaseLookupString: 'Fisk'},
    {htmlText: 'Sallad', databaseLookupString: 'Sallad'},
    {htmlText: 'Snabblagat', databaseLookupString: 'Snabblagat'},
    {htmlText: 'Soppa', databaseLookupString: 'Soppa'},
    {htmlText: 'Vardagsmat', databaseLookupString: 'Vardagsmat'},
    {htmlText: 'Vegetariskt', databaseLookupString: 'Vegetariskt'}
  ];
};

getMealCategoriesExceptAll = () => getMealCategories().filter((c) => c.databaseLookupString !== '');