import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from "./product/product-list.component";
import { CategoryListComponent } from './category/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { LoginComponent } from './security/login.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'canAccessProducts' }

  },
  {
    path: 'productDetail/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'canAccessProducts' }

  },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'canAccessCategories' }

  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
