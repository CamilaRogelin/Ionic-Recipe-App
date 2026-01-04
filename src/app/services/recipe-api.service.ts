import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// small interface just for the api list results
export interface ApiRecipeSummary {
  id: number;
  title: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {

  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  // search recipes by text / ingredients
  searchRecipes(query: string): Observable<{ results: ApiRecipeSummary[] }> {

    const params = new HttpParams()
      .set('query', query.trim())
      .set('apiKey', this.apiKey);

    // keeping it simple for now, no extra options
    return this.http.get<{ results: ApiRecipeSummary[] }>(
      `${this.baseUrl}/complexSearch`,
      { params }
    );
  }

  // get full info for one recipe (used in details page)
  getRecipeDetails(id: number): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('includeNutrition', 'false');

    return this.http.get<any>(
      `${this.baseUrl}/${id}/information`,
      { params }
    );
  }
}
