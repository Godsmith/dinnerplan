'use strict';

moment.locale(navigator.language);

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

i18n.setDefaultLanguage('sv_SE');
i18n.showMissing(true);
i18n.map('sv_SE', {
  layout: {
    plan: "Veckoplan",
    recipes: "Recept",
    ingredients: "Ingredienser",
    shoppingList: "Inköpslista",
    about: "Om",
    tools: "Verktyg"
  },
  about: {
    madeBy: 'Skapad av',
    source: 'Källkod',
    roadmap: 'Roadmap',
    bugReports: 'Felrapporter'
  },
  editDay: {
    oneOrMoreRecipeNames: "Ett eller flera receptnamn"
  },
  editRecipe: {
    areYouSureYouWantToDelete: "Är du säker på att du vill ta bort receptet?"
  },
  mealProperty: {
    name: 'Namn',
    source: 'Källa',
    servings: 'Portioner',
    time: 'Tid',
    ingredients: 'Ingredienser',
    steps: 'Steg',
    rating: 'Betyg',
    categories: 'Kategorier',
    comments: 'Kommentarer'
  },
  ingredients: {
    nameOfIngredient: "Namn på ingrediens",
    search: "Sök"
  },
  day: {
    Monday: 'Måndag',
    Tuesday: 'Tisdag',
    Wednesday: 'Onsdag',
    Thursday: 'Torsdag',
    Friday: 'Fredag',
    Saturday: 'Lördag',
    Sunday: 'Söndag'
  },
  plan: {
    weeksBackAnd: 'veckor bakåt och',
    weeksAfter: 'veckor därefter'
  },
  mealCategories: {
    all: 'Alla',
    entertaining: 'Bjudmat',
    fish: 'Fisk',
    salad: 'Sallad',
    quick: 'Snabblagat',
    soup: 'Soppa',
    everyday: 'Vardagsmat',
    vegetarian: 'Vegetariskt'
  },
  shoppingList: {
    createShoppingList: 'Skapa inköpslista'
  },
  tools: {
    export: 'Exportera recept'
  }
});
i18n.map('en_US', {
  layout: {
    plan: "Week Plan",
    recipes: "Recipes",
    ingredients: "Ingredients",
    shoppingList: "Shopping List",
    about: "About",
    tools: "Tools"
  },
  about: {
    madeBy: 'Made by',
    source: 'Source',
    roadmap: 'Roadmap',
    bugReports: 'Issue tracker'
  },
  editDay: {
    oneOrMoreRecipeNames: "One or more recipe names"
  },
  editRecipe: {
    areYouSureYouWantToDelete: "Are you sure you want to delete the recipe?"
  },
  mealProperty: {
    name: 'Name',
    source: 'Source',
    servings: 'Servings',
    time: 'Time',
    ingredients: 'Ingredients',
    steps: 'Steps',
    rating: 'Rating',
    categories: 'Categories',
    comments: 'Comments'
  },
  ingredients: {
    nameOfIngredient: "Ingredient name",
    search: "Search"
  },
  day: {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday'
  },
  plan: {
    weeksBackAnd: 'weeks back and',
    weeksAfter: 'weeks after'
  },
  mealCategories: {
    all: 'All',
    entertaining: 'Entertaining',
    fish: 'Fish',
    salad: 'Salad',
    quick: 'Quick',
    soup: 'Soup',
    everyday: 'Everyday',
    vegetarian: 'Vegetarian'
  },
  shoppingList: {
    createShoppingList: 'Create shopping list'
  },
  tools: {
    export: 'Export recipes'
  }
});
