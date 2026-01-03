import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class RecipeDetailPage {

  recipe: any;   // here I keep the selected recipe

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
  ) {
    // get the "id" from the url
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;

    // ask the service for only this recipe
    this.recipe = this.recipesService.getRecipeById(id);
  }
}
