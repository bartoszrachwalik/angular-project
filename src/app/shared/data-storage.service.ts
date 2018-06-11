import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(
      'https://angular-project-dcdc7.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    return this.http.get('https://angular-project-dcdc7.firebaseio.com/recipes.json')
      .subscribe(
        (response: Recipe[]) => {
          const recipes: Recipe[] = response;
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
