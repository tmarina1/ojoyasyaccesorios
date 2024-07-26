import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  id_product: string = '';
  product!: Product;
  selected_file: File | null = null;
  alert_success: boolean = false;
  alert_error: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private product_service: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id_product = params['id'];
    });

    this.product_service
      .get_product_by_id(this.id_product)
      .subscribe((product_obtained) => {
        console.log(product_obtained);
        this.product = product_obtained;
        this.form_edit_product.patchValue({
          name: this.product.name,
          price: this.product.price,
          stock: this.product.stock,
          description: this.product.description,
        });
      });
  }

  form_edit_product = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    stock: [0, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
    image: [null],
  });

  get name() {
    return this.form_edit_product.get('name') as FormControl;
  }

  get description() {
    return this.form_edit_product.get('description') as FormControl;
  }

  get price() {
    return this.form_edit_product.get('price') as FormControl;
  }

  get stock() {
    return this.form_edit_product.get('stock') as FormControl;
  }

  get image() {
    return this.form_edit_product.get('image') as FormControl;
  }

  up_load_file(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selected_file = file;
    }
  }

  update_product() {
    this.product.name = this.form_edit_product.get('name')?.value!;
    this.product.description =
      this.form_edit_product.get('description')?.value!;
    this.product.price = this.form_edit_product.get('price')?.value!;
    this.product.stock = this.form_edit_product.get('stock')?.value!;

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('stock', this.product.stock.toString());

    if (this.selected_file) {
      formData.append('image', this.selected_file);
    }

    console.log(formData);
    this.product_service
      .update_product(this.id_product, formData)
      .subscribe((response) => {
        if (response) {
          this.alert_success = true;
        } else {
          this.alert_error = true;
        }
      });
  }
}
