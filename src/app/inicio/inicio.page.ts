import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CarritoService, Product } from '../../services/carrito.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1, // Mostrar 1 slide a la vez
    autoplay: true, // Hacer que las imágenes se cambien automáticamente
  };

  products: Product[] = [];

  constructor(private cartService: CarritoService) {}

  ngOnInit() {
    /* ### BASE DE DATOS LOCAL ### */
    this.products = [
      { 
        id: 1, 
        nombre: 'Completo Italiano + bebida media', 
        descripcion: 'Pan copihue casero, vienesa de pollo, palta chilena, tomate y mayo casera', 
        precio: 1500, 
        cantidad: 0 
      },
      { id: 2, 
        nombre: 'As Italiano + bebida media', 
        descripcion: 'Pan copihue casero, churrasco, palta chilena, tomate y mayo casera', 
        precio: 2500, 
        cantidad: 0
      },
    ];
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
}
