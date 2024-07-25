import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'manage-products',
    component: ManageProductsComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'new-product',
    component: NewProductComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
