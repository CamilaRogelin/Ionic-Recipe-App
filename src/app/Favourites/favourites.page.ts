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
  private favStorageKey = 'favouriteRecipes';

  constructor(
    private router: Router,
  ) {
    // when page is created I just load from storage
    this.loadFavourites();
  }

  // small helper to read from localStorage
  loadFavourites() {
    try {
      const json = localStorage.getItem(this.favStorageKey);
      if (!json) {
        this.favouriteRecipes = [];
        return;
      }
      const parsed = JSON.parse(json);
      this.favouriteRecipes = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.log('error loading favourites', e);
      this.favouriteRecipes = [];
    }
  }

  openDetail(id: number) {
    this.router.navigate(['/recipe-detail', id]);
  }

  goBackHome() {
    this.router.navigate(['/home']);
  }

  // optional small refresh button, in case user change fav on other screen
  refreshList() {
    this.loadFavourites();
  }
}
