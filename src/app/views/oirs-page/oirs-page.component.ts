import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';



import { format } from 'rut.js';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-oirs-page',
  standalone: true,
  imports: [TableModule, CommonModule, TooltipModule, FormsModule, ReactiveFormsModule, DialogModule, InputTextareaModule, FileUploadModule],
  templateUrl: './oirs-page.component.html',
  styleUrl: './oirs-page.component.scss'
})

export class OirsPageComponent implements OnInit {

  persona: any = null;
  open1 = true;
  open2 = false;
  open3 = false;
  open4 = false;
  open5 = false;

  userformSolicitud!: FormGroup;
  userformRetroalimentacion!: FormGroup;

  modalEventoDetalle: boolean = false;

  detalleSolicitud = {
    identificador: '',
    episodio: '',
    fecha_solicitud: '',
    tipo_solicitud: '',
    correo_contacto: '',
    detalle_solicitud: '',
    respuesta_detalle: ''
  }

  modalRetroalimentacionDetalle: boolean = false;

  detalleRetroalimentacion = {
    identificador_emisor: '',
    identificador_afectado: '',
    fecha_solicitud: '',
    glosa_tipo_retroalinebtacion: '',
    observacion: '',
    respuesta_detalle: ''
  }

  constructor(private router: Router,
    private fb: FormBuilder,
  ) { }


  listaSolicitudTotal = [
    {
      identificador: "16713155-7",
      episodio: "CDT-2025-4645",
      fecha_solicitud: "20/11/2025",
      tipo_solicitud: "SOLICITUD EVOLUCIÓN",
      observacion: "POR FAVOR SE SOLICITA EVOLUCIONES DE LA ATENCION YA QUE ESTOS NO SE ENCUENTRAN DENTRO DEL RESUMEN DE ATENCION (CDT-2025-4645). ",
      id_estado: "1",
      glosa_estado: "PENDIENTE",
      correo_contacto: "siboney.muñoz@gmail.com"
    },
    {
      identificador: "16713155-7",
      episodio: "CDT-2025-4841",
      fecha_solicitud: "02/11/2025",
      tipo_solicitud: "SOLICITUD RECETA MED.",
      observacion: "POR FAVOR SE SOLICITA EVOLUCIONES DE LA ATENCION YA QUE ESTOS NO SE ENCUENTRAN DENTRO DEL RESUMEN DE ATENCION (CDT-2025-4645). ",
      id_estado: "1",
      glosa_estado: "ENTREGADA",
      correo_contacto: "siboney.muñoz@gmail.com"
    },
    {
      identificador: "16713155-7",
      episodio: "CDT-2025-6859",
      fecha_solicitud: "12/10/2025",
      tipo_solicitud: "SOLICITUD RESULTADO",
      observacion: "POR FAVOR SE SOLICITA EVOLUCIONES DE LA ATENCION YA QUE ESTOS NO SE ENCUENTRAN DENTRO DEL RESUMEN DE ATENCION (CDT-2025-4645). ",
      id_estado: "1",
      glosa_estado: "ENTREGADA",
      correo_contacto: "siboney.muñoz@gmail.com"
    },
    {
      identificador: "16713155-7",
      episodio: "HOSP-2025-4645",
      fecha_solicitud: "22/09/2025",
      tipo_solicitud: "SOLICITUD EVOLUACIÓN",
      observacion: "POR FAVOR SE SOLICITA EVOLUCIONES DE LA ATENCION YA QUE ESTOS NO SE ENCUENTRAN DENTRO DEL RESUMEN DE ATENCION (CDT-2025-4645). ",
      id_estado: "1",
      glosa_estado: "ENTREGADA",
      correo_contacto: "siboney.muñoz@gmail.com"
    },
    {
      identificador: "16939341-9",
      episodio: "URG-2025-4450",
      fecha_solicitud: "11/11/2025",
      tipo_solicitud: "SOLICITUD RESULTADO",
      observacion: "POR FAVOR SE SOLICITA EVOLUCIONES DE LA ATENCION YA QUE ESTOS NO SE ENCUENTRAN DENTRO DEL RESUMEN DE ATENCION (CDT-2025-4645). ",
      id_estado: "1",
      glosa_estado: "ENTREGADA",
      correo_contacto: "fernando.lopez@gmail.com"
    },
    {
      identificador: "16939341-9",
      episodio: "HOSP-2025-4512",
      fecha_solicitud: "01/10/2025",
      tipo_solicitud: "SOLICITUD EVOLUACIÓN",
      observacion: "POR FAVOR SE SOLICITA EVOLUCIONES DE LA ATENCION YA QUE ESTOS NO SE ENCUENTRAN DENTRO DEL RESUMEN DE ATENCION (CDT-2025-4645). ",
      id_estado: "1",
      glosa_estado: "ENTREGADA",
      correo_contacto: "fernando.lopez@gmail.com"
    }
  ];

  listaSolicitudFiltro: any[] = [];

  listaRetroalimentacionTotal = [
    {
      identificador_emisor: "16713155-7",
      identificador_afectado: "18983537-K",
      fecha_solicitud: "02/11/2025",
      id_tipo_retroalinebtacion: "1",
      glosa_tipo_retroalinebtacion: "RECLAMO",
      observacion: "MAL ATENCION POR PARTE DEL PERSONA, LUIS (18983537-K) RECIBIO UN MAL TRATO POR PARTE DEL DOCTOR HERNAN SOTO"
    },
    {
      identificador_emisor: "15888333-2",
      identificador_afectado: "15888333-2",
      fecha_solicitud: "15/11/2025",
      id_tipo_retroalinebtacion: "2",
      glosa_tipo_retroalinebtacion: "FELICITACIÓN",
      observacion: "EXCELENTE ATENCIÓN EN EL SERVICIO DE URGENCIA, MUY RÁPIDO Y AMABLE EL PERSONAL."
    },
    {
      identificador_emisor: "12345678-9",
      identificador_afectado: "98765432-1",
      fecha_solicitud: "10/11/2025",
      id_tipo_retroalinebtacion: "1",
      glosa_tipo_retroalinebtacion: "RECLAMO",
      observacion: "DEMORA EXCESIVA EN LA ENTREGA DE MEDICAMENTOS EN FARMACIA."
    },
    {
      identificador_emisor: "11223344-5",
      identificador_afectado: "11223344-5",
      fecha_solicitud: "18/11/2025",
      id_tipo_retroalinebtacion: "3",
      glosa_tipo_retroalinebtacion: "SUGERENCIA",
      observacion: "SE SUGIERE MEJORAR LA SEÑALÉTICA EN EL SECTOR DE IMAGENOLOGÍA."
    },
    {
      identificador_emisor: "99887766-5",
      identificador_afectado: "55443322-1",
      fecha_solicitud: "05/11/2025",
      id_tipo_retroalinebtacion: "1",
      glosa_tipo_retroalinebtacion: "RECLAMO",
      observacion: "NO SE RESPETÓ LA HORA DE LA CITA MÉDICA, ESPERÉ MÁS DE 2 HORAS."
    }
  ];

  listaRetroalimentacionFiltro: any[] = [];



  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const stored = localStorage.getItem('persona');

      if (stored) {
        this.persona = JSON.parse(stored);
      }
    }

    this.userformSolicitud = this.fb.group({
      'identificador': new FormControl('', Validators.required),
      'episodio': new FormControl('', Validators.required),
      'tipo_solicitud': new FormControl('', Validators.required)
    });

    this.userformRetroalimentacion = this.fb.group({
      'identificador_emisor': new FormControl('', Validators.required),
      'identificador_afectado': new FormControl('', Validators.required),
      'tipo_categoria': new FormControl('', Validators.required)
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
        localStorage.clear();      // Limpia token + datos del usuario
        this.router.navigate(['/login']);
      }
    });
  }

  busqueda(data: any, tipo_busuqeda: number) {
    console.log('data ,', data.value);

    if (tipo_busuqeda === 1) {
      let identificador = data.value.identificador?.trim().toLowerCase();
      let episodio = data.value.episodio?.trim().toLowerCase();
      // let tipo_solicitud = data.value.numero_ficha?.trim().toLowerCase();

      this.listaSolicitudFiltro = this.listaSolicitudTotal.filter((p) => {

        const matchIdentificador =
          !identificador || p.identificador.toLowerCase().includes(identificador);

        const matchEpisodio =
          !episodio || p.episodio.toLowerCase().includes(episodio);

        // const matchFicha =
        //   !numero_ficha || (p.numero_ficha?.toLowerCase().includes(numero_ficha));

        return matchIdentificador && matchEpisodio;
      });
    } else if (tipo_busuqeda === 2) {
      let identificador_emisor = data.value.identificador_emisor?.trim().toLowerCase();
      let identificador_afectado = data.value.identificador_afectado?.trim().toLowerCase();
      let tipo_categoria = data.value.tipo_categoria?.trim().toLowerCase();

      this.listaRetroalimentacionFiltro = this.listaRetroalimentacionTotal.filter((p) => {
        const matchEmisor = !identificador_emisor || p.identificador_emisor.toLowerCase().includes(identificador_emisor);
        const matchAfectado = !identificador_afectado || p.identificador_afectado.toLowerCase().includes(identificador_afectado);
        const matchCategoria = !tipo_categoria || p.glosa_tipo_retroalinebtacion.toLowerCase().includes(tipo_categoria);

        return matchEmisor && matchAfectado && matchCategoria;
      });
    }

  }

  limpiar() {
    this.listaSolicitudFiltro = [];
    this.userformSolicitud.patchValue({
      identificador: '',
      nombre: '',
      numero_ficha: ''
    });
  }

  formatearRut(id_rut: number) {
    switch (id_rut) {
      case 1:
        this.userformSolicitud.patchValue({
          identificador: format(this.userformSolicitud.value.identificador).replace(/\./gi, '')
        });
        break;
      case 2:
        this.userformRetroalimentacion.patchValue({
          identificador_emisor: format(this.userformRetroalimentacion.value.identificador_emisor).replace(/\./gi, '')
        });
        break;
      case 3:
        this.userformRetroalimentacion.patchValue({
          identificador_afectado: format(this.userformRetroalimentacion.value.identificador_afectado).replace(/\./gi, '')
        });
        break;
    }
  }

  verDetalleSolicitud(solicitud: any) {
    this.modalEventoDetalle = true;
    this.detalleSolicitud.identificador = solicitud.identificador;
    this.detalleSolicitud.episodio = solicitud.episodio;
    this.detalleSolicitud.fecha_solicitud = solicitud.fecha_solicitud;
    this.detalleSolicitud.tipo_solicitud = solicitud.tipo_solicitud;
    this.detalleSolicitud.correo_contacto = solicitud.correo_contacto;
    this.detalleSolicitud.detalle_solicitud = solicitud.observacion;
  }

  verDetalleRetroalimentacion(solicitud: any) {
    this.modalRetroalimentacionDetalle = true;
    this.detalleRetroalimentacion = { ...solicitud }; // Copia simple del objeto
  }

  guardarInformacion() {
    if (this.detalleSolicitud.respuesta_detalle.length > 0) {
      this.modalEventoDetalle = false;
      Swal.fire({
        title: "Información Guardada!",
        icon: "success",
        draggable: false
      });
    } else {
      this.modalEventoDetalle = false;
      Swal.fire({
        title: 'Información faltante!',
        text: 'Favor ingresar respuesta a la solicitud',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.modalEventoDetalle = true;
        }
      });
    }

  }

  guardarRetroalimentacion() {
    this.modalRetroalimentacionDetalle = false;
    Swal.fire({
      title: "Información Guardada!",
      icon: "success",
      draggable: false
    });
  }

}
