import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    // return this.http.put(
    //   'https://angular-project-16d36.firebaseio.com/recipes.json?auth=' + token,
    //   this.recipeService.getRecipes()
    // );

    // creates request from scratch
    const req = new HttpRequest('PUT', 'https://angular-project-16d36.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {reportProgress: true, params: new HttpParams().set('auth', token)});
    return this.http.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://angular-project-16d36.firebaseio.com/recipes.json?auth=' + token)
      .pipe(map(
        (recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
