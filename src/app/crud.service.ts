import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../product.model';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private collectionName = 'crud';  // Nombre de la colección en Firestore

  constructor(private firestore: Firestore) {}

  // 🔹 Obtener todos los productos
  getProducts(): Observable<Product[]> {
    const ref = collection(this.firestore, this.collectionName);
    const productsQuery = query(ref); // 🔹 Convertir a Query
    return collectionData(productsQuery, { idField: 'id' }) as Observable<Product[]>;
  }

  // 🔹 Agregar un nuevo producto
  async addProduct(product: Product) {
    const ref = collection(this.firestore, this.collectionName);
    await addDoc(ref, product);
  }

  // 🔹 Editar un producto
  async updateProduct(product: Product) {
    if (!product.id) return;
    const ref = doc(this.firestore, this.collectionName, product.id);
    await updateDoc(ref, { ...product });
  }

  // 🔹 Eliminar un producto
  async deleteProduct(productId: string) {
    const ref = doc(this.firestore, this.collectionName, productId);
    await deleteDoc(ref);
  }
}
