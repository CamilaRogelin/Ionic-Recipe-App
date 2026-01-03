import { Router } from '@angular/router';
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

  // just keep a small list here to show on the screen
  recipes: any[] = [];

  constructor(
    private recipesService: RecipesService,
    private router: Router,   // new guy here
  ) {
    // very simple: ask the service for all recipes
    this.recipes = this.recipesService.getAllRecipes();
  }

  openRecipe(id: number) {
    // go to the detail page and send the id in the url
    this.router.navigate(['/recipe-detail', id]);
  }
}
