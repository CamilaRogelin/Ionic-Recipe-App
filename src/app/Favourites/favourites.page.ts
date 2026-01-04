import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    CommonModule,
    NgForOf,
  ],
})
export class FavouritesPage {

  favouriteRecipes: any[] = [];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
  ) {
    // load current favourites when page is created
    this.favouriteRecipes = this.recipesService.getFavouriteRecipes();
  }

  openDetail(id: number) {
    this.router.navigate(['/recipe-detail', id]);
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }
}
