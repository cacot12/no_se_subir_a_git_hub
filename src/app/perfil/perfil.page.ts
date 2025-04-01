import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { addIcons } from 'ionicons';
import { storefrontOutline, happyOutline, cartOutline, fastFoodOutline, menuOutline } from 'ionicons/icons';
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Importa Firestore
import { Auth } from '@angular/fire/auth'; // Importa Auth

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]  // Asegúrate de incluir FormsModule aquí
})
export class PerfilPage implements OnInit {
  profileImage: string | ArrayBuffer | null = null;
  puntosAcumulados: number = 0;
  nombreUsuario: string = '';
  correoElectronico: string = '';
  direccion: string = ''; // Nueva propiedad para la dirección
  userId: string = ''; // ID del usuario autenticado

  constructor(private firestore: Firestore, private auth: Auth) { // Inyecta Firestore y Auth
    addIcons({ storefrontOutline, cartOutline, happyOutline, menuOutline, fastFoodOutline });
  }

  ngOnInit() {
    this.cargarPuntos();
    this.cargarDatosUsuario();
    this.cargarDireccion(); // Carga la dirección al iniciar el componente
    this.cargarDatosDesdeFirestore(); // Carga los datos del usuario desde Firestore
  }

  cargarPuntos() {
    const puntos = localStorage.getItem('puntosAcumulados');
    this.puntosAcumulados = puntos ? parseFloat(puntos) : 0;
  }

  cargarDatosUsuario() {
    const user = this.auth.currentUser; // Obtén el usuario autenticado
    if (user) {
      this.userId = user.uid; // Asigna el ID del usuario
    } else {
      console.log('No hay usuario autenticado.');
    }
  }

  cargarDireccion() {
    this.direccion = localStorage.getItem('direccion') || ''; // Carga la dirección del localStorage
  }

  async cargarDatosDesdeFirestore() {
    try {
      // Asegúrate de que userId tenga el ID del usuario autenticado
      const userDoc = await getDoc(doc(this.firestore, 'users', this.userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Datos del usuario:', userData); // Agrega un log para ver los datos

        // Verifica si userData tiene las propiedades esperadas
        this.nombreUsuario = userData?.['name'] || 'Nombre no disponible';
        this.correoElectronico = userData?.['email'] || 'Correo no disponible';
        this.direccion = userData?.['address'] || 'Dirección no disponible';
      } else {
        console.log('No se encontró el documento del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
}
