import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';

import { format } from 'rut.js';
import Swal from 'sweetalert2';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-oirs-page',
  standalone: true,
  imports: [
    TableModule, CommonModule, TooltipModule,
    FormsModule, ReactiveFormsModule, DialogModule,
    InputTextareaModule, FileUploadModule
  ],
  templateUrl: './oirs-page.component.html',
  styleUrl: './oirs-page.component.scss'
})
export class OirsPageComponent implements OnInit {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private portalService = inject(PortalService);
  private platformId = inject(PLATFORM_ID);

  persona: any = null;

  open1 = true;
  open2 = false;
  open3 = false;
  open4 = false;
  open5 = false;

  userformSolicitud!: FormGroup;
  userformRetroalimentacion!: FormGroup;

  modalEventoDetalle = false;
  modalRetroalimentacionDetalle = false;

  detalleSolicitud: any = {};

  detalleRetroalimentacion: any = {};

  listaSolicitudTotal: any[] = [];
  listaSolicitudFiltro: any[] = [];

  listaRetroalimentacionTotal: any[] = [];
  listaRetroalimentacionFiltro: any[] = [];

  loadingSolicitudes = false;
  loadingRetro = false;

  constructor() { }

  ngOnInit(): void {
    this.userformSolicitud = this.fb.group({
      identificador: new FormControl('', Validators.required),
      episodio: new FormControl('', Validators.required),
      tipo_solicitud: new FormControl('', Validators.required)
    });

    this.userformRetroalimentacion = this.fb.group({
      identificador_emisor: new FormControl('', Validators.required),
      identificador_afectado: new FormControl('', Validators.required),
      tipo_categoria: new FormControl('', Validators.required)
    });

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage) {
        const stored = localStorage.getItem('persona');
        if (stored) {
          this.persona = JSON.parse(stored);
        }
      }

      this.cargarSolicitudes();
      this.cargarRetroalimentaciones();
    }
  }

  cargarSolicitudes() {
    this.loadingSolicitudes = true;

    this.portalService.getSolicitudesTotal().subscribe({
      next: (data) => {
        this.listaSolicitudTotal = data;
        this.listaSolicitudFiltro = [];
        this.loadingSolicitudes = false;
      },
      error: () => {
        Swal.fire("Error", "No se pudieron cargar las solicitudes", "error");
        this.loadingSolicitudes = false;
      }
    });
  }

  cargarRetroalimentaciones() {
    this.loadingRetro = true;

    this.portalService.getRetroalimentacionTotal().subscribe({
      next: (data) => {
        this.listaRetroalimentacionTotal = data;
        this.listaRetroalimentacionFiltro = [];
        this.loadingRetro = false;
      },
      error: () => {
        Swal.fire("Error", "No se pudieron cargar las retroalimentaciones", "error");
        this.loadingRetro = false;
      }
    });
  }

  toggle(number: number) {
    this.open1 = number === 1;
    this.open2 = number === 2;
    this.open3 = number === 3;
    this.open4 = number === 4;
    this.open5 = number === 5;
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

  busqueda(data: any, tipo_busuqeda: number) {
    if (tipo_busuqeda === 1) {
      let identificador = data.value.identificador?.trim().toLowerCase();
      let episodio = data.value.episodio?.trim().toLowerCase();

      this.listaSolicitudFiltro = this.listaSolicitudTotal.filter((p) => {
        const matchIdentificador = !identificador || p.identificador.toLowerCase().includes(identificador);
        const matchEpisodio = !episodio || p.episodio.toLowerCase().includes(episodio);
        return matchIdentificador && matchEpisodio;
      });

    } else if (tipo_busuqeda === 2) {
      let idEmisor = data.value.identificador_emisor?.trim().toLowerCase();
      let idAfectado = data.value.identificador_afectado?.trim().toLowerCase();
      let categoria = data.value.tipo_categoria?.trim().toLowerCase();

      this.listaRetroalimentacionFiltro = this.listaRetroalimentacionTotal.filter((p) => {
        return (
          (!idEmisor || p.identificador_emisor.toLowerCase().includes(idEmisor)) &&
          (!idAfectado || p.identificador_afectado.toLowerCase().includes(idAfectado)) &&
          (!categoria || p.glosa_tipo_retroalimentacion.toLowerCase().includes(categoria))
        );
      });
    }
  }

  limpiar() {
    this.listaSolicitudFiltro = [];
    this.userformSolicitud.reset();
  }

  formatearRut(id_rut: number) {
    if (id_rut === 1) {
      this.userformSolicitud.patchValue({
        identificador: format(this.userformSolicitud.value.identificador).replace(/\./gi, '')
      });
    } else if (id_rut === 2) {
      this.userformRetroalimentacion.patchValue({
        identificador_emisor: format(this.userformRetroalimentacion.value.identificador_emisor).replace(/\./gi, '')
      });
    } else if (id_rut === 3) {
      this.userformRetroalimentacion.patchValue({
        identificador_afectado: format(this.userformRetroalimentacion.value.identificador_afectado).replace(/\./gi, '')
      });
    }
  }

  verDetalleSolicitud(solicitud: any) {
    this.modalEventoDetalle = true;
    this.detalleSolicitud = { ...solicitud };
  }

  verDetalleRetroalimentacion(retro: any) {
    this.modalRetroalimentacionDetalle = true;
    this.detalleRetroalimentacion = { ...retro };
  }

  guardarInformacion() {
    if (this.detalleSolicitud.respuesta_detalle?.length > 0) {
      this.modalEventoDetalle = false;
      Swal.fire("Información Guardada!", "", "success");
    } else {
      this.modalEventoDetalle = false;
      Swal.fire({
        title: "Información faltante",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalEventoDetalle = true;
        }
      })
    }
  }

  guardarRetroalimentacion() {
    this.modalRetroalimentacionDetalle = false;
    Swal.fire("Información Guardada!", "", "success");
  }

}
