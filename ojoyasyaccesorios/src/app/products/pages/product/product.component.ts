import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private product_service: ProductService
  ) {}

  id_product: string = '';
  product!: Product;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id_product = params['id'];
    });

    this.product_service
      .get_product_by_id(this.id_product)
      .subscribe((product_obtained) => {
        console.log(product_obtained);
        this.product = product_obtained;
      });
  }
}
