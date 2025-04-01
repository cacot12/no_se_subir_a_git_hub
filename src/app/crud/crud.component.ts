import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Product } from '../../product.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CrudComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', price: 0, description: '', imageUrl: '' };

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // 🔹 Cargar productos desde Firestore
  loadProducts() {
    this.crudService.getProducts().subscribe(data => {
      this.products = data;
    }, error => console.error("Error al cargar productos:", error));
  }

  // 🔹 Agregar un producto
  async addProduct() {
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      alert('Por favor, ingresa un nombre y un precio válido.');
      return;
    }
    await this.crudService.addProduct(this.newProduct);
    this.newProduct = { name: '', price: 0, description: '', imageUrl: '' };
  }

  // 🔹 Eliminar un producto
  async deleteProduct(productId?: string) {
    if (!productId) return;
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await this.crudService.deleteProduct(productId);
    }
  }
}
