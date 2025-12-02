import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { format } from 'rut.js';
import Swal from 'sweetalert2';

import { PortalService } from '../../services/portal.service'; 

@Component({
  selector: 'app-administrador-page',
  standalone: true,
  imports: [TableModule, CommonModule, TooltipModule, FormsModule, ReactiveFormsModule],
  templateUrl: './administrador-page.component.html',
  styleUrl: './administrador-page.component.scss'
})
export class AdministradorPageComponent implements OnInit {

  persona: any = null;

  open1 = true;
  open2 = false;
  open3 = false;
  open4 = false;
  open5 = false;

  userform!: FormGroup;

  listaPacientesTotal: any[] = []; 
  listaPacientesFiltro: any[] = [];

  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private portalService: PortalService 
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const stored = localStorage.getItem('persona');
      if (stored) {
        this.persona = JSON.parse(stored);
      }
    }

    this.userform = this.fb.group({
      identificador: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      numero_ficha: new FormControl('', Validators.required)
    });

    this.cargarPacientes(); 
  }

  cargarPacientes() {
    this.loading = true;

    this.portalService.getPacientesTotal().subscribe({
      next: (data) => {
        console.log("Pacientes recibidos:", data);
        this.listaPacientesTotal = data;
        this.listaPacientesFiltro = [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error cargando pacientes:", err);

        Swal.fire({
          title: "Error al cargar pacientes",
          text: "No se pudieron obtener los datos desde el servidor.",
          icon: "error",
        });

        this.loading = false;
      }
    });
  }

  toggle(number: number) {
    this.open1 = false;
    this.open2 = false;
    this.open3 = false;
    this.open4 = false;
    this.open5 = false;

    switch (number) {
      case 1: this.open1 = true; break;
      case 2: this.open2 = true; break;
      case 3: this.open3 = true; break;
      case 4: this.open4 = true; break;
      case 5: this.open5 = true; break;
    }
  }

  logout() {
    Swal.fire({
      title: "¿Confirmas que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#38C870",
      cancelButtonColor: "#d33",
      confirmButtonText: "Seguro",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  busqueda(data: any) {
    let identificador = data.value.identificador?.trim().toLowerCase();
    let nombre = data.value.nombre?.trim().toLowerCase();
    let numero_ficha = data.value.numero_ficha?.trim().toLowerCase();

    this.listaPacientesFiltro = this.listaPacientesTotal.filter((p) => {
      const matchIdentificador =
        !identificador || p.identificador.toLowerCase().includes(identificador);

      const matchNombre =
        !nombre || p.nombre.toLowerCase().includes(nombre);

      const matchFicha =
        !numero_ficha || (p.numero_ficha?.toLowerCase().includes(numero_ficha));

      return matchIdentificador && matchNombre && matchFicha;
    });
  }

  limpiar() {
    this.listaPacientesFiltro = [];
    this.userform.patchValue({
      identificador: '',
      nombre: '',
      numero_ficha: ''
    });
  }

  formatearRut() {
    if (this.userform.value.identificador != '') {
      this.userform.patchValue({
        identificador: format(this.userform.value.identificador).replace(/\./gi, '')
      });
    }
  }

  irPortalPaciente(identificador: string) {
    this.router.navigate(
      ['/portal-paciente'],
      { state: { identificador } }
    );
  }
}
