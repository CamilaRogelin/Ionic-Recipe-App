import { Injectable } from '@angular/core';

// service just to store the recipes in memory (no api yet)
@Injectable({
  providedIn: 'root',
})
export class RecipesService {

  // small list of vegan recipes :)
  private recipes = [
    {
      id: 1,
      title: 'Vegan Chickpea Curry',
      ingredients: 'chickpeas, coconut milk, curry, veggies, rice',
      description: 'easy curry that I like, kind of basic but tasty',
      time: '25 min',
      difficulty: 'easy',
      isFavourite: false,   // new flag
    },
    {
      id: 2,
      title: 'Tofu Veggie Stir Fry',
      ingredients: 'tofu, broccoli, peppers, soy sauce, noodles',
      description: 'quick stir fry tofu for busy days haha',
      time: '15 min',
      difficulty: 'easy/medium',
      isFavourite: false,   // new flag
    },
  ];

  constructor() {
    // nothing here for now, maybe later :)
  }

  // returns all recipes (just my mock data)
  getAllRecipes() {
    return this.recipes;
  }

  // find recipe by id. not super fancy but ok
  getRecipeById(id: number) {
    return this.recipes.find(r => r.id === id);
  }

  // toggle favourite on/off for one recipe
  toggleFavourite(id: number) {
    const recipe = this.getRecipeById(id);
    if (recipe) {
      recipe.isFavourite = !recipe.isFavourite;
    }
  }

  // return only the recipes that are marked as fav
  getFavouriteRecipes() {
    return this.recipes.filter(r => r.isFavourite);
  }

}
