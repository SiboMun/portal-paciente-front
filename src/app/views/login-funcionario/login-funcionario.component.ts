import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalService } from '../../services/portal.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CanActivate, Router } from '@angular/router';



import { format } from 'rut.js';
import { sha256 } from 'js-sha256';
import { MessageService } from 'primeng/api';

import Swal from 'sweetalert2'

@Component({
    selector: 'app-login-funcionario',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ToastModule],
    templateUrl: './login-funcionario.component.html',
    styleUrl: './login-funcionario.component.scss'
})
export class LoginFuncionarioComponent {
    constructor(private portalService: PortalService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private router: Router
    ) {

    }
    usuario = '';
    clave = '';
    usuarioLogin: any;

    userform!: FormGroup;

    aceptaTerminos = false;


    ngOnInit() {


        this.userform = this.fb.group({
            'usuario': new FormControl('', Validators.required),
            'clave': new FormControl('', Validators.required)
        });

    }

    perfilSeleccionado: number = 2; // Por defecto OIRS (2)

    seleccionarPerfil(id: number) {
        this.perfilSeleccionado = id;
    }

    login() {

        if (this.userform.value.clave.length == 0 || this.userform.value.usuario.length == 0) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Por favor, ingresar informacion necesaria.',
                showConfirmButton: false,
                timer: 2500
            });
            return;
        }

        var claveCod = sha256(this.userform.value.clave);
        this.usuarioLogin = {
            rut: this.userform.value.usuario,
            clave: claveCod,
            token: '',
            id_sistema: 1
        };

        this.portalService.login(this.userform.value.usuario, claveCod)
            .subscribe({
                next: (resp: any) => {
                    if (resp.ok) {

                        // Validar que el usuario tenga el perfil seleccionado
                        if (resp.personal.id_perfil != this.perfilSeleccionado) {
                            Swal.fire({
                                toast: true,
                                position: 'top-end',
                                icon: 'error',
                                title: 'El usuario no corresponde al perfil seleccionado.',
                                showConfirmButton: false,
                                timer: 4000
                            });
                            return;
                        }

                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Has ingresado correctamente',
                            showConfirmButton: false,
                            timer: 2500
                        });

                        localStorage.setItem('persona', JSON.stringify(resp.personal));
                        localStorage.setItem('token', resp.token);
                        let identificador = this.usuarioLogin.rut;

                        if (this.perfilSeleccionado == 1) {
                            this.router.navigate(
                                ['/administrador'],
                                { state: { identificador } }
                            );
                        } else if (this.perfilSeleccionado == 2) {
                            this.router.navigate(
                                ['/oirs'],
                                { state: { identificador } }
                            );
                        }

                    } else {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: 'Información Incorrecta',
                            showConfirmButton: false,
                            timer: 4000
                        });
                        return;
                    }
                },
                error: (err => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Información Incorrecta',
                        showConfirmButton: false,
                        timer: 4000
                    });
                    return;
                })

            });

    }

    formatearRut() {
        if (this.userform.value.usuario != '') {
            this.userform.patchValue({
                usuario: format(this.userform.value.usuario).replace(/\./gi, '')
            });
        }
    }



}

