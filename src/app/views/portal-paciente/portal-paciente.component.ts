import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

import Swal from 'sweetalert2'

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-portal-paciente',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    DialogModule
  ],
  templateUrl: './portal-paciente.component.html',
  styleUrl: './portal-paciente.component.scss'
})
export class PortalPacienteComponent implements OnInit {

  religionLista = [
    { "id": 1, "codigo": "01", "nombre": "CATOLICÍSMO" },
    { "id": 2, "codigo": "02", "nombre": "EVANGÉLICA O PROTESTANTE" },
    { "id": 3, "codigo": "03", "nombre": "JUDAÍSMO" },
    { "id": 4, "codigo": "04", "nombre": "ISLAM" },
    { "id": 5, "codigo": "05", "nombre": "MORMONISMO" },
    { "id": 6, "codigo": "06", "nombre": "ORTODOXA" },
    { "id": 7, "codigo": "07", "nombre": "BUDISMO" },
    { "id": 8, "codigo": "08", "nombre": "FE BAHÁ'Í" },
    { "id": 9, "codigo": "09", "nombre": "TESTIGO DE JEHOVÁ" },
    { "id": 10, "codigo": "10", "nombre": "ESPIRITUALIDAD INDÍGENA" },
    { "id": 11, "codigo": "11", "nombre": "OTRA RELIGIÓN O CREDO" },
    { "id": 12, "codigo": "96", "nombre": "NINGUNA" },
    { "id": 13, "codigo": "99", "nombre": "DESCONOCIDO" }
  ];

  estadoCivilLista = [
    { "id": 1, "codigo": "01", "nombre": "SOLTERO(A)" },
    { "id": 2, "codigo": "02", "nombre": "CASADO(A)" },
    { "id": 3, "codigo": "03", "nombre": "VIUDO(A)" },
    { "id": 4, "codigo": "04", "nombre": "DIVORCIADO(A)" },
    { "id": 5, "codigo": "05", "nombre": "SEPARADO(A) JUDICIALMENTE" },
    { "id": 6, "codigo": "06", "nombre": "CONVIVIENTE CIVIL" },
    { "id": 7, "codigo": "99", "nombre": "DESCONOCIDO" }
  ];

  puebloOriginarioLista = [
    { "id": 1, "codigo": "01", "nombre": "MAPUCHE" },
    { "id": 2, "codigo": "02", "nombre": "AYMARA" },
    { "id": 3, "codigo": "03", "nombre": "RAPA NUI (PASCUENSE)" },
    { "id": 4, "codigo": "04", "nombre": "LICAN ANTAI (ATACAMEÑO)" },
    { "id": 5, "codigo": "05", "nombre": "QUECHUA" },
    { "id": 6, "codigo": "06", "nombre": "COLLA" },
    { "id": 7, "codigo": "07", "nombre": "DIAGUITA" },
    { "id": 8, "codigo": "08", "nombre": "KAWÉSQAR" },
    { "id": 9, "codigo": "09", "nombre": "YAGÁN (YÁMANA)" },
    { "id": 10, "codigo": "10", "nombre": "OTRO (ESPECIFICAR)" },
    { "id": 11, "codigo": "96", "nombre": "NINGUNO" },
    { "id": 12, "codigo": "11", "nombre": "CHANGO" }
  ];

  ocupacionLista = [
    { "id": 1, "codigo": "01", "nombre": "MIEMBRO DEL PODER EJECUTIVO" },
    { "id": 2, "codigo": "02", "nombre": "PROFESIONALES CIENTÍFICOS" },
    { "id": 3, "codigo": "03", "nombre": "TÉCNICOS Y PROFESIONALES DE NIVEL MEDIO" },
    { "id": 4, "codigo": "04", "nombre": "EMPLEADOS DE OFICINA" },
    { "id": 5, "codigo": "05", "nombre": "TRABAJADORES DE LOS SERVICIOS" },
    { "id": 6, "codigo": "06", "nombre": "AGRICULTORES Y TRABAJADORES AGROPECUARIOS" },
    { "id": 7, "codigo": "07", "nombre": "OFICIALES, OPERARIOS Y ARTESANOS" },
    { "id": 8, "codigo": "08", "nombre": "OPERADORES DE INSTALACIONES Y MÁQUINAS" },
    { "id": 9, "codigo": "09", "nombre": "TRABAJADORES NO CALIFICADOS" },
    { "id": 10, "codigo": "10", "nombre": "FUERZAS ARMADAS" },
    { "id": 11, "codigo": "99", "nombre": "DESCONOCIDO" }
  ];

  sexoLista = [
    { "id": 1, "codigo": "01", "nombre": "HOMBRE" },
    { "id": 2, "codigo": "02", "nombre": "MUJER" },
    { "id": 3, "codigo": "99", "nombre": "DESCONOCIDO" },
    { "id": 4, "codigo": "03", "nombre": "INTERSEX" }
  ];

  generoLista = [
    { "id": 1, "codigo": "02", "nombre": "FEMENINO" },
    { "id": 2, "codigo": "03", "nombre": "TRANSGÉNERO" },
    { "id": 3, "codigo": "99", "nombre": "DESCONOCIDO" },
    { "id": 4, "codigo": "01", "nombre": "MASCULINO" },
    { "id": 5, "codigo": "04", "nombre": "FEMENINO TRANS (FT)" },
    { "id": 6, "codigo": "05", "nombre": "MASCULINO TRANS (MT)" }
  ];


  persona: any = null;
  id_perfil: any = null;

  open1 = true;
  open2 = false;
  open3 = false;
  open4 = false;
  open5 = false;

  identificador: string | null = null;

  userform!: FormGroup;

  displayFeedbackDialog = false;
  feedbackForm!: FormGroup;
  feedbackType: 'solicitud' | 'reclamo' | null = null;

  displayDialog: boolean = false;

  tipoRegistro = [
    { label: 'Solicitud', value: 'solicitud' },
    { label: 'Reclamo / Felicitación', value: 'reclamo' }
  ];
  selectedTipo: any;

  tipoSolicitud = [
    { label: 'SOL. RECETA MÉDICA', value: 'receta' },
    { label: 'SOL. EVOLUCIONES', value: 'evoluciones' },
    { label: 'SOL. EXÁMENES', value: 'examenes' }
  ];
  selectedSolicitud: any = null;

  episodios: any[] = [];
  anterioresAtencionesSolicitud: any[] = [];
  selectedEpisodio: any = null;

  emailSolicitud: string = '';
  detalleSolicitud: string = '';

  tipoReclamo = [
    { label: 'FELICITACIONES', value: 'felicitaciones' },
    { label: 'RECLAMO', value: 'reclamo' },
    { label: 'SUGERENCIA', value: 'sugerencia' }
  ];
  selectedReclamo: any;

  rutEmisor: string = '';
  afectado: string = '';
  detalleReclamo: string = '';

  usuarioSeleccionado: any = null;

  anterioresAtencionesFiltroCDT: any[] = [];
  anterioresAtencionesFiltroHOSP: any[] = [];
  anterioresAtencionesFiltroURG: any[] = [];
  anterioresAtencionesFiltroDOM: any[] = [];
  anterioresAtencionesFiltroQUI: any[] = [];

  resultadosFiltroLAB: any[] = [];

  proximasAtencionesFiltro: any[] = [];

  solicitudesLaboratorioFiltro: any[] = [];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private portalService: PortalService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.identificador = nav?.extras.state?.['identificador'] ?? null;
  }

  ngOnInit(): void {
    console.log('this.identificador, ', this.identificador);

    this.userform = this.fb.group({
      identificador: new FormControl({ value: '', disabled: true }),
      fecha_nacimiento: new FormControl({ value: '', disabled: true }),
      pais: new FormControl({ value: '', disabled: true }),
      religion: new FormControl({ value: '', disabled: true }),
      estado_civil: new FormControl({ value: '', disabled: true }),
      pueblo_indigena: new FormControl({ value: '', disabled: true }),
      ocupacion: new FormControl({ value: '', disabled: true }),
      sexo: new FormControl({ value: '', disabled: true }),
      genero: new FormControl({ value: '', disabled: true }),
      prevision: new FormControl({ value: '', disabled: true })
    });

    if (this.identificador) {
      this.cargarDatosPaciente();
      this.cargarAnterioresAtenciones();
      this.cargarResultadosTotales();
      this.cargarSolicitudesLaboratorio();
      this.cargarProximasAtenciones();
    }

    if (typeof window !== 'undefined' && localStorage) {
      const stored = localStorage.getItem('persona');
      if (stored) {
        this.persona = JSON.parse(stored);
        this.id_perfil = this.persona.id_perfil;
      }
    }
  }

  cargarDatosPaciente() {
    this.portalService.getPaciente(this.identificador!).subscribe(data => {
      this.usuarioSeleccionado = data;

      this.userform.patchValue({
        identificador: data.identificador,
        fecha_nacimiento: data.fecha_nacimiento,
        pais: data.pais,
        religion: data.religion,
        estado_civil: data.estado_civil,
        pueblo_indigena: data.pueblo_indigena,
        ocupacion: data.ocupacion,
        sexo: data.sexo,
        genero: data.genero,
        prevision: data.prevision
      });
    });
  }

  cargarAnterioresAtenciones() {
    this.portalService.getAnterioresAtenciones(this.identificador!).subscribe((data: any[]) => {
      this.anterioresAtencionesFiltroCDT = data.filter(p => p.ambito === 2);
      this.anterioresAtencionesFiltroURG = data.filter(p => p.ambito === 3);
      this.anterioresAtencionesFiltroHOSP = data.filter(p => p.ambito === 1);
      this.anterioresAtencionesFiltroDOM = data.filter(p => p.ambito === 4);
      this.anterioresAtencionesFiltroQUI = data.filter(p => p.ambito === 5);
    });
  }

  cargarResultadosTotales() {
    this.portalService.getResultadosTotales(this.identificador!).subscribe((data: any[]) => {
      this.resultadosFiltroLAB = data.filter(p => p.tipo_solicitud === 1);
    });
  }

  cargarSolicitudesLaboratorio() {
    this.portalService.getSolicitudesLaboratorio(this.identificador!).subscribe((data: any[]) => {
      console.log(data);

      this.solicitudesLaboratorioFiltro = data;
    });
  }

  cargarProximasAtenciones() {
    this.portalService.getProximasAtenciones(this.identificador!).subscribe((data: any[]) => {
      this.proximasAtencionesFiltro = data;
    });
  }


  abrirPdf(item: any) {
    const base64 = item.pdf_base64;
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
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

  abrirDialogoRetroalimentacion() {
    this.displayFeedbackDialog = true;
    this.feedbackType = null;
    this.initFeedbackForm();
  }

  initFeedbackForm() {
    this.feedbackForm = this.fb.group({
      tipo: ['', Validators.required],
      tipoSolicitud: [''],
      episodio: [''],
      correoSolicitud: ['', Validators.email],
      observacionSolicitud: [''],
      tipoRetroalimentacion: [''],
      rutEmisor: [''],
      identificarAfectado: [''],
      detalleRetroalimentacion: ['']
    });
  }

  onTipoChange(tipo: 'solicitud' | 'reclamo') {
    this.feedbackType = tipo;
    this.feedbackForm.patchValue({ tipo });

    this.resetValidations();

    if (tipo === 'solicitud') {
      this.feedbackForm.get('tipoSolicitud')?.setValidators([Validators.required]);
      this.feedbackForm.get('episodio')?.setValidators([Validators.required]);
      this.feedbackForm.get('correoSolicitud')?.setValidators([Validators.required, Validators.email]);
      this.feedbackForm.get('observacionSolicitud')?.setValidators([Validators.required]);
    } else {
      this.feedbackForm.get('tipoRetroalimentacion')?.setValidators([Validators.required]);
      this.feedbackForm.get('rutEmisor')?.setValidators([Validators.required]);
      this.feedbackForm.get('identificarAfectado')?.setValidators([Validators.required]);
      this.feedbackForm.get('detalleRetroalimentacion')?.setValidators([Validators.required]);
    }

    this.feedbackForm.updateValueAndValidity();
  }

  resetValidations() {
    const fields = [
      'tipoSolicitud', 'episodio', 'correoSolicitud',
      'observacionSolicitud', 'tipoRetroalimentacion',
      'rutEmisor', 'identificarAfectado', 'detalleRetroalimentacion'
    ];

    fields.forEach(field => {
      this.feedbackForm.get(field)?.clearValidators();
      this.feedbackForm.get(field)?.setValue('');
    });
  }

  enviarRetroalimentacion() {
    if (this.feedbackForm.valid) {
      Swal.fire({
        icon: 'success',
        title: this.feedbackType === 'solicitud'
          ? 'Solicitud enviada'
          : 'Retroalimentación enviada',
        timer: 2000,
        showConfirmButton: false
      });

      this.displayFeedbackDialog = false;
      this.feedbackForm.reset();
      this.feedbackType = null;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Por favor complete todos los campos requeridos.'
      });
    }
  }

  openDialog() {
    this.displayDialog = true;
  }

  activarCampo(campo: number) {
    const controls = [
      '',
      'religion',
      'estado_civil',
      'pueblo_indigena',
      'ocupacion',
      'sexo',
      'genero'
    ];

    if (controls[campo]) {
      const control = this.userform.get(controls[campo]);
      if (control?.disabled) {
        control.enable();
      } else {
        control?.disable();
      }
    }
  }

  guardarInformacion() {
    if (this.userform.valid) {
      Swal.fire('Éxito', 'Información actualizada correctamente', 'success');
      this.userform.disable();
    }
  }

  confirmar(accion: number) {
    if (accion === 1) {
      Swal.fire('Confirmado', 'Su cita ha sido confirmada', 'success');
    } else {
      Swal.fire('Cancelado', 'Su cita ha sido cancelada', 'info');
    }
  }

  get isSolicitudValid(): boolean {
    return !!(
      this.selectedSolicitud &&
      this.selectedEpisodio &&
      this.emailSolicitud?.trim() !== '' &&
      this.detalleSolicitud?.trim() !== ''
    );
  }

  get isReclamoValid(): boolean {
    return !!(
      this.selectedReclamo &&
      this.rutEmisor?.trim() !== '' &&
      this.afectado?.trim() !== '' &&
      this.detalleReclamo?.trim() !== ''
    );
  }

  guardarSolicitud() {
    Swal.fire('Información Enviada', 'Su solicitud ha sido registrada correctamente.', 'success');
    this.displayDialog = false;
  }

  enviarReclamo() {
    Swal.fire('Información Enviada', 'Su retroalimentación ha sido enviada correctamente.', 'success');
    this.displayDialog = false;
  }

  atrasAdministrador() {
    this.router.navigate(['/administrador']);
  }

}
