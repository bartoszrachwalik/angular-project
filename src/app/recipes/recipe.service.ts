import {Subject} from 'rxjs/Subject';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingedient.model';

export class RecipeService {
  recipesChange = new Subject<Recipe[]>();

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

  constructor() {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChange.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChange.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChange.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChange.next(this.recipes.slice());
  }
}
