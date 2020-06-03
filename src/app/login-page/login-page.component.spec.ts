import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { fakeAsync, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { LoginPageComponent } from './login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser'
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;
  let location: Location;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientModule]
    })
    router = TestBed.get(Router);
    location = TestBed.get(Location);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

  let errors = {};


  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });


  it('UserName invalid when it is empty', () => {
    let userName = component.loginForm.controls['userId'];
    expect(userName.valid).toBeFalsy();
  });

  it('userName must required', () => {
    let userName = component.loginForm.controls['userId'];
    errors = userName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('userName is valid when it has some data', () => {
    let userName = component.loginForm.controls['userId'];
    userName.setValue("username");
    errors = userName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('password is invalid when there it is empty', () => {

    let password = component.loginForm.controls['password'];
    // Email field is required
    expect(password.valid).toBeFalsy();

  });

  it('password must required', () => {
    let password = component.loginForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('password is valid when it has some data', () => {
    let password = component.loginForm.controls['password'];
    password.setValue("password");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('cannot submit when username and password is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
    //component.loginfunc();
  });

  it('cannot submit when username is filled and password is empty', () => {
    component.loginForm.controls['userId'].setValue("userName");
    component.loginForm.controls['password'].setValue("");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('cannot submit when username is empty and password is filled', () => {
    component.loginForm.controls['userId'].setValue("");
    component.loginForm.controls['password'].setValue("23323");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('can Submit when there is valid data for username and password', () => {
    component.loginForm.controls['userId'].setValue("username");
    component.loginForm.controls['password'].setValue("12345");
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('When form is valid by clicking submit button it should call onSubmitLogin Function', () => {
    fixture.detectChanges();
    spyOn(component, 'OnSubmitLogin');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.OnSubmitLogin).toHaveBeenCalledTimes(1);
  });


});
