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
    about: "Om"
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
  }
});
