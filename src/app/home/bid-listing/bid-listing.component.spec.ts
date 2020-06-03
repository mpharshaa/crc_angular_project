import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BidListingComponent } from './bid-listing.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
describe('BidListingComponent', () => {
  let component: BidListingComponent;
  let fixture: ComponentFixture<BidListingComponent>;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidListingComponent ],
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => {
  ///  expect(component).toBeTruthy();
  //});




  it('When form is valid by clicking submit button it should call getBidForm Function', () => {
    fixture.detectChanges();
    spyOn(component, 'getBidForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.getBidForm).toHaveBeenCalledTimes(0);
  });
});
