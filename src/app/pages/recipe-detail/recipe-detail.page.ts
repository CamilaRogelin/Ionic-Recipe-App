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

  // go back to home list
  goBack() {
    this.router.navigate(['/home']);
  }
}
