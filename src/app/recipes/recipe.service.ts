import {EventEmitter} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingedient.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Hamburger',
      'America!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/1200px-Hamburger_%28black_bg%29.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bun', 1),
        new Ingredient('Lettuce', 1),
        new Ingredient('Tomatoes', 2)
      ]),
    new Recipe('Corn flakes',
      'Best for breakfast',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cereal_con_yogur.jpg/1200px-Cereal_con_yogur.jpg',
      [
        new Ingredient('Milk', 1),
        new Ingredient('Cornflakes', 1)
      ]),
    new Recipe('Chili con carne',
      'Super hot!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Bowl_of_chili.jpg/1200px-Bowl_of_chili.jpg',
      [
        new Ingredient('Beans', 1),
        new Ingredient('Meat', 1),
        new Ingredient('Tomatoes', 5),
        new Ingredient('Chili', 3)
      ]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
