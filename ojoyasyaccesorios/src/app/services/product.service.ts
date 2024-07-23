import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PRODUCTS_URL,
  PRODUCTS_URL_BY_ID,
  PORDUCT_CREATE,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  create(product: Product) {
    return this.http.post<Product>(PORDUCT_CREATE, product);
  }

  get_all(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  get_product_by_url(id: number): Observable<Product> {
    return this.http.get<Product>(PRODUCTS_URL_BY_ID + id);
  }
}
