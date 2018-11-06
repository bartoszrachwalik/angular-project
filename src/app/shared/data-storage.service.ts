import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

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
    // const headers = new HttpHeaders().set('Authorization', 'Bearer example');

    return this.http.put(
      'https://angular-project-16d36.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes(), {
        // headers: headers
        // params: new HttpParams().set('auth', token),
        // observe: 'events'
      }
    );
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://angular-project-16d36.firebaseio.com/recipes.json?auth=' + token,
      // {
      //   // overwrites body with full response and treats it as a text
      //   observe: 'response',
      //   responseType: 'text'
      // }
    )
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
