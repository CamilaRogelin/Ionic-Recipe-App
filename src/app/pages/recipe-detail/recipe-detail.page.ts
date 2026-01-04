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

  // here I control if I show metric or us units
  // by default I use metric cause I am in europe now :)
  selectedUnit: 'metric' | 'us' = 'metric';

  constructor(
    private route: ActivatedRoute,
    private recipeApi: RecipeApiService,
    private router: Router,
  ) {}

  ngOnInit() {
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

  // go back to home list
  goBack() {
    this.router.navigate(['/home']);
  }
}
