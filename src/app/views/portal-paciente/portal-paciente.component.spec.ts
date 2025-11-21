import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalPacienteComponent } from './portal-paciente.component';

describe('PortalPacienteComponent', () => {
  let component: PortalPacienteComponent;
  let fixture: ComponentFixture<PortalPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
