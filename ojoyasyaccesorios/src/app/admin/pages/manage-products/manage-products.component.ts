import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent {
  products: Product[] = [];
  show_alert: boolean = false;
  id_product: string = '';
  error_alert: boolean = false;
  success_alert: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.get_all().subscribe((products) => {
      this.products = products;
    });
  }

  alert_message(id: string) {
    this.id_product = id;
    this.show_alert = true;
  }

  delete_product() {
    this.productService.delete(this.id_product).subscribe((response) => {
      if (response) {
        this.success_alert = true;
        this.productService.get_all().subscribe((products) => {
          this.products = products;
        });
      } else {
        this.error_alert = false;
      }
      this.show_alert = false;
    });
  }

  cancel_delete() {
    this.show_alert = false;
  }
}
