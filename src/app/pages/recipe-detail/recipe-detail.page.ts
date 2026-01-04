import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeApiService } from '../../services/recipe-api.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class RecipeDetailPage implements OnInit {

  recipe: any;       // here I keep the recipe data from api
  isLoading = false;
  errorMessage = '';

  selectedUnit: 'metric' | 'us' = 'metric';
  private unitStorageKey = 'measurementUnit';

  // small flag just to know if this recipe is in favourites or not
  isFavourite = false;
  private favStorageKey = 'favouriteRecipes';

  constructor(
    private route: ActivatedRoute,
    private recipeApi: RecipeApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    // first read what settings page saved (or default metric)
    const saved = localStorage.getItem(this.unitStorageKey);
    if (saved === 'metric' || saved === 'us') {
      this.selectedUnit = saved;
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;

    if (!id) {
      this.errorMessage = 'Invalid recipe id in url :(';
      return;
    }

    this.loadRecipe(id);
  }

  // very simple call to the api to get the full info
  loadRecipe(id: number) {
    this.isLoading = true;

    this.recipeApi.getRecipeDetails(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.isLoading = false;
        // after load, check if this recipe is already in favourites
        this.isFavourite = this.checkIfFavourite(this.recipe.id);
      },
      error: (err) => {
        console.log('error loading recipe details', err);
        this.errorMessage = 'Could not load recipe details now, sorry.';
        this.isLoading = false;
      }
    });
  }

  // switch between metric and us
  changeUnit(unit: 'metric' | 'us') {
    this.selectedUnit = unit;
    // also save so next time app remember this choice
    localStorage.setItem(this.unitStorageKey, this.selectedUnit);
  }

  // build a small text for each ingredient based on the unit selected
  getIngredientText(ing: any): string {
    // sometimes api not give measures, so I just show original
    if (!ing || !ing.measures) {
      return ing?.original || '';
    }

    const measures = ing.measures[this.selectedUnit];

    if (!measures || measures.amount == null) {
      // if the unit is missing I fallback to original text
      return ing.original;
    }

    const amount = measures.amount;
    const unitLong = measures.unitLong || '';

    // not doing any rounding crazy stuff here, just normal concat
    return `${amount} ${unitLong}`.trim();
  }

  // read favourites list from localStorage
  private getFavouritesFromStorage(): any[] {
    try {
      const json = localStorage.getItem(this.favStorageKey);
      if (!json) return [];
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.log('error reading favourites from storage', e);
      return [];
    }
  }

  // save favourites back to localStorage
  private saveFavouritesToStorage(favs: any[]) {
    try {
      localStorage.setItem(this.favStorageKey, JSON.stringify(favs));
    } catch (e) {
      console.log('error saving favourites to storage', e);
    }
  }

  // just check if current recipe id exists in favourites list
  private checkIfFavourite(id: number): boolean {
    const favs = this.getFavouritesFromStorage();
    return favs.some(r => r.id === id);
  }

  // called when user press add/remove favourites button
  toggleFavourite() {
    if (!this.recipe) return;

    const favs = this.getFavouritesFromStorage();

    if (this.isFavourite) {
      // remove from favourites
      const newFavs = favs.filter(r => r.id !== this.recipe.id);
      this.saveFavouritesToStorage(newFavs);
      this.isFavourite = false;
    } else {
      // add to favourites
      // I dont need full crazy object, but I just save all for now
      favs.push(this.recipe);
      this.saveFavouritesToStorage(favs);
      this.isFavourite = true;
    }
  }

  // go back to home list
  goBack() {
    this.router.navigate(['/home']);
  }
}
