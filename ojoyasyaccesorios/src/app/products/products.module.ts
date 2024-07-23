import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ProductComponent } from './pages/product/product.component';

@NgModule({
  declarations: [ListProductsComponent, ProductComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
