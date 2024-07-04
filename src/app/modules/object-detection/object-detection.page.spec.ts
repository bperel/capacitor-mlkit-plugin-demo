import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { ObjectDetectionPage } from './object-detection.page';

describe('ObjectDetectionPage', () => {
  let component: ObjectDetectionPage;
  let fixture: ComponentFixture<ObjectDetectionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectDetectionPage],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectDetectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
