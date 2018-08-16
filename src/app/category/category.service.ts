import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category } from './category';
import { of } from 'rxjs/observable/of';
import { CATEGORIES_MOCK } from './categories-mock';

@Injectable()
export class CategoryService {

  constructor() { }
  
  getCategories(): Observable<Category[]> {
    return of<Category[]>(CATEGORIES_MOCK);
  }  
}
