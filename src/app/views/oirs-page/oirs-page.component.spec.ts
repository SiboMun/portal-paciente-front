import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OirsPageComponent } from './oirs-page.component';

describe('OirsPageComponent', () => {
  let component: OirsPageComponent;
  let fixture: ComponentFixture<OirsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OirsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OirsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
