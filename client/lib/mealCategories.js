getMealCategories = function () {
  return [
    {htmlText: i18n('mealCategories.all'), databaseLookupString: ''},
    {htmlText: i18n('mealCategories.entertaining'), databaseLookupString: i18n('mealCategories.entertaining')},
    {htmlText: i18n('mealCategories.fish'), databaseLookupString: i18n('mealCategories.fish')},
    {htmlText: i18n('mealCategories.salad'), databaseLookupString: i18n('mealCategories.salad')},
    {htmlText: i18n('mealCategories.quick'), databaseLookupString: i18n('mealCategories.quick')},
    {htmlText: i18n('mealCategories.soup'), databaseLookupString: i18n('mealCategories.soup')},
    {htmlText: i18n('mealCategories.everyday'), databaseLookupString: i18n('mealCategories.everyday')},
    {htmlText: i18n('mealCategories.vegetarian'), databaseLookupString: i18n('mealCategories.vegetarian')}
  ];
};

getMealCategoriesExceptAll = () => getMealCategories().filter((c) => c.databaseLookupString !== '');