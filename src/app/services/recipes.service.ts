import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {

  private recipes = [
    {
      id: 1,
      title: 'Vegan Chickpea Curry',
      ingredients: 'chickpeas, coconut milk, curry, veggies, rice',
    },
    {
      id: 2,
      title: 'Tofu Veggie Stir Fry',
      ingredients: 'tofu, broccoli, peppers, soy sauce, noodles',
    },
  ];

  constructor() {}

  getAllRecipes() {
    return this.recipes;
  }

  getRecipeById(id: number) {
    return this.recipes.find(r => r.id === id);
  }

}
