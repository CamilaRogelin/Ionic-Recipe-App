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
    },
    {
      id: 2,
      title: 'Tofu Veggie Stir Fry',
      ingredients: 'tofu, broccoli, peppers, soy sauce, noodles',
      description: 'quick stir fry tofu for busy days haha',
      time: '15 min',
      difficulty: 'easy/medium',
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

}
