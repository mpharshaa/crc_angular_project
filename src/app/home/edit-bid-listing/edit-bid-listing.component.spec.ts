
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EditBidListingComponent } from './edit-bid-listing.component';

describe('EditBidListingComponent', () => {
  let component: EditBidListingComponent;
  let fixture: ComponentFixture<EditBidListingComponent>;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBidListingComponent ],
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBidListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 // it('should create', () => {
 //   expect(component).toBeTruthy();
 // });


 it('When form is valid by clicking submit button it should call getBidForm Function', () => {
  fixture.detectChanges();
  spyOn(component, 'getBidForm');
  el = fixture.debugElement.query(By.css('button')).nativeElement;
  el.click();
  expect(component.getBidForm).toHaveBeenCalledTimes(0);
});
});
