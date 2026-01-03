import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    NgForOf,
  ],
})
export class HomePage {

  // small list of recipes that I will show in the screen
  recipes: any[] = [];

  constructor(private recipesService: RecipesService) {
    // very simple: ask the service for all recipes
    this.recipes = this.recipesService.getAllRecipes();
  }

  // later we maybe use this for navigation :)
  openRecipe(id: number) {
    alert('you clicked recipe with id: ' + id);
  }
}
