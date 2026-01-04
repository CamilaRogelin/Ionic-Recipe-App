import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

import { RecipeApiService, ApiRecipeSummary } from '../services/recipe-api.service';

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
    IonButtons,
    IonButton,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonItem,
    IonLabel,
    NgForOf,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage {

  ingredientsText: string = '';
  apiRecipes: ApiRecipeSummary[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private recipeApi: RecipeApiService,
    private router: Router,
  ) {}

  searchRecipes() {
    this.errorMessage = '';
    const query = this.ingredientsText.trim();

    if (!query) {
      this.errorMessage = 'Please type at least one ingredient :)';
      this.apiRecipes = [];
      return;
    }

    this.isLoading = true;

    this.recipeApi.searchRecipes(query).subscribe({
      next: (data) => {
        this.apiRecipes = data.results ?? [];
        this.isLoading = false;

        if (this.apiRecipes.length === 0) {
          this.errorMessage = 'No recipes found for this search';
        }
      },
      error: (err) => {
        console.log('api error', err);
        this.isLoading = false;
        this.errorMessage = 'Something broke with api, I try again later :(';
      }
    });
  }

  openDetails(recipe: ApiRecipeSummary) {
    this.router.navigate(['/recipe-detail', recipe.id]);
  }

  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}
