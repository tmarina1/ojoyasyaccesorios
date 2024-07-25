import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
  product: Product = new Product();
  selected_file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private product_service: ProductService
  ) {}

  get name() {
    return this.form_create_product.get('name') as FormControl;
  }

  get brand() {
    return this.form_create_product.get('brand') as FormControl;
  }

  get description() {
    return this.form_create_product.get('description') as FormControl;
  }

  get price() {
    return this.form_create_product.get('price') as FormControl;
  }

  get stock() {
    return this.form_create_product.get('stock') as FormControl;
  }

  get weight() {
    return this.form_create_product.get('weight') as FormControl;
  }

  get image() {
    return this.form_create_product.get('image') as FormControl;
  }

  up_load_file(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selected_file = file;
    }
  }

  form_create_product = this.formBuilder.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: [null, Validators.required],
    stock: [null, Validators.required],
    description: ['', Validators.required],
    weight: [null, Validators.required],
    image: [null, Validators.required],
  });

  create_product() {
    if (this.form_create_product.valid) {
      this.product.name = this.form_create_product.get('name')?.value!;
      this.product.brand = this.form_create_product.get('brand')?.value!;
      this.product.description =
        this.form_create_product.get('description')?.value!;
      this.product.price = this.form_create_product.get('price')?.value!;
      this.product.stock = this.form_create_product.get('stock')?.value!;
      this.product.weight = this.form_create_product.get('weight')?.value!;

      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('brand', this.product.brand);
      formData.append('description', this.product.description);
      formData.append('price', this.product.price.toString());
      formData.append('stock', this.product.stock.toString());
      formData.append('weight', this.product.weight.toString());

      if (this.selected_file) {
        formData.append('image', this.selected_file);
      }

      this.product_service.create(formData).subscribe(
        (response) => {
          console.log('Product created successfully', response);
        },
        (error) => {
          console.error('Error creating product', error);
        }
      );
    } else {
      console.error('Form is invald');
    }
  }
}
