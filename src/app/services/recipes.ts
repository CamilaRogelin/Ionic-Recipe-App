import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  // my small list of recipes (just for learn project)
  private recipes = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      ingredients: 'pasta, meat, tomato sauce'
    },
    {
      id: 2,
      title: 'Chicken Curry',
      ingredients: 'chicken, curry, rice'
    }
  ];

  constructor() {
    // nothing here yet, maybe later :)
  }

  // return all recipes that I have here
  getAllRecipes() {
    return this.recipes;
  }

  // get only one recipe by id (if exist)
  getRecipeById(id: number) {
    return this.recipes.find(r => r.id === id);
  }
}