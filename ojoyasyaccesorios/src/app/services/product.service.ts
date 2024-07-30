import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PRODUCTS_URL,
  PRODUCTS_BY_ID,
  PORDUCT_CREATE,
  PRODUCT_DELETE,
  PRODUCT_UPDATE,
} from '../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  create(product: FormData): Observable<Boolean> {
    return this.http.post<Boolean>(PORDUCT_CREATE, product);
  }

  get_all(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  get_product_by_id(id: string): Observable<Product> {
    return this.http.get<Product>(PRODUCTS_BY_ID + id);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(PRODUCT_DELETE + id);
  }

  update_product(id: string, product_data: FormData): Observable<Product> {
    return this.http.patch<Product>(PRODUCT_UPDATE + id, product_data);
  }
}
