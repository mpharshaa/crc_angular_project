import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser'
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';



describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let router: Router;
  let location: Location;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientModule],
    })
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  });

 // it('should create', () => {
 //   expect(component).toBeTruthy();
 // });

 let errors = {};

 it('form invalid when empty', () => {
  expect(component.resetPassword.valid).toBeFalsy();
});

it('currentPassword invalid when it is empty', () => {
  let currentPassword = component.resetPassword.controls['currentPassword'];
  expect(currentPassword.valid).toBeFalsy();
});

it('currentPassword must required', () => {
  let currentPassword = component.resetPassword.controls['currentPassword'];
  errors = currentPassword.errors || {};
  expect(errors['required']).toBeTruthy();
});


it('currentPassword is valid when it has some data', () => {
  let currentPassword = component.resetPassword.controls['currentPassword'];
  currentPassword.setValue("username");
  errors = currentPassword.errors || {};
  expect(errors['required']).toBeFalsy();
});

it('PasswordOne invalid when it is empty', () => {
  let passwordOne = component.resetPassword.controls['passwordOne'];
  expect(passwordOne.valid).toBeFalsy();
});

it('PasswordOne must required', () => {

  let PasswordOne = component.resetPassword.controls['passwordOne'];
  errors = PasswordOne.errors || {};
  expect(errors['required']).toBeTruthy();
});


it('PasswordOne is valid when it has some data', () => {

  let PasswordOne = component.resetPassword.controls['passwordOne'];
  PasswordOne.setValue("username");
  errors = PasswordOne.errors || {};
  expect(errors['required']).toBeFalsy();
});



it('PasswordTwo invalid when it is empty', () => {
  let passwordTwo = component.resetPassword.controls['passwordTwo'];
  expect(passwordTwo.valid).toBeFalsy();
});
it('passwordTwo must required', () => {

  let passwordTwo = component.resetPassword.controls['passwordTwo'];
  errors = passwordTwo.errors || {};
  expect(errors['required']).toBeTruthy();
});

it('passwordTwo is valid when it has some data', () => {

  let passwordTwo = component.resetPassword.controls['passwordTwo'];
  passwordTwo.setValue("username");
  errors = passwordTwo.errors || {};
  expect(errors['required']).toBeFalsy();
});
it('captcha invalid when it is empty', () => {
  let captcha = component.resetPassword.controls['captcha'];
  expect(captcha.valid).toBeFalsy();
});


it('captcha must required', () => {

  let captcha = component.resetPassword.controls['captcha'];
  errors = captcha.errors || {};
  expect(errors['required']).toBeTruthy();
});
it('captcha is valid when it has some data', () => {

  let captcha = component.resetPassword.controls['captcha'];
  captcha.setValue("username");
  errors = captcha.errors || {};
  expect(errors['required']).toBeFalsy();
});



it('cannot submit when passwords are empty', () => {
  expect(component.resetPassword.valid).toBeFalsy();
  //component.loginfunc();
});

it('cannot submit when all the fields are empty', () => {
  component.resetPassword.controls['currentPassword'].setValue("");
  component.resetPassword.controls['passwordOne'].setValue("");
  component.resetPassword.controls['passwordTwo'].setValue("");
  component.resetPassword.controls['captcha'].setValue("");
  expect(component.resetPassword.valid).toBeFalsy();
});

it('cannot submit when currentpassword is empty where Newpasswords and captcha  are filled', () => {
  component.resetPassword.controls['currentPassword'].setValue("");
  component.resetPassword.controls['passwordOne'].setValue("passwordOne");
  component.resetPassword.controls['passwordTwo'].setValue("passwordTwo");
  component.resetPassword.controls['captcha'].setValue('captcha');
  expect(component.resetPassword.valid).toBeFalsy();
});
it('cannot submit when currentpassword  and captcha are filled where one of the Newpasswords are empty', () => {
  component.resetPassword.controls['currentPassword'].setValue("currentPassword");
  component.resetPassword.controls['passwordOne'].setValue("");
  component.resetPassword.controls['passwordTwo'].setValue("passwordTwo");
  component.resetPassword.controls['captcha'].setValue('captcha');
  expect(component.resetPassword.valid).toBeFalsy();
});

it('cannot submit when currentpassword  and captcha are filled where one of the Newpasswords are empty', () => {
  component.resetPassword.controls['currentPassword'].setValue("currentPassword");
  component.resetPassword.controls['passwordOne'].setValue("passwordOne");
  component.resetPassword.controls['passwordTwo'].setValue("");
  component.resetPassword.controls['captcha'].setValue('captcha');
  expect(component.resetPassword.valid).toBeFalsy();
});

it('cannot submit when captcha is empty and remaining fields are filled', () => {
  component.resetPassword.controls['currentPassword'].setValue("currentPassword");
  component.resetPassword.controls['passwordOne'].setValue("passwordOne");
  component.resetPassword.controls['passwordTwo'].setValue("passwordTwo");
  component.resetPassword.controls['captcha'].setValue('');
  expect(component.resetPassword.valid).toBeFalsy();
});


it('can Submit when there is valid data for fields', () => {
  component.resetPassword.controls['currentPassword'].setValue("username");
  component.resetPassword.controls['passwordOne'].setValue("12345");
  component.resetPassword.controls['passwordTwo'].setValue("12345");
  component.resetPassword.controls['captcha'].setValue('captcha');
  expect(component.resetPassword.valid).toBeTruthy();
});

it('When form is valid by clicking submit button it should call onChangePassword Function', () => {
  fixture.detectChanges();
  spyOn(component, 'resetPasswordfunc');
  el = fixture.debugElement.query(By.css('button')).nativeElement;
  el.click();
  expect(component.resetPasswordfunc).toHaveBeenCalledTimes(1);
});

});
