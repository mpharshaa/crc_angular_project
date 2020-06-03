import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {AuthGuard} from './auth.guard';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import {environment} from 'src/environments/environment';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { BidListingComponent } from './home/bid-listing/bid-listing.component';
import { EditBidListingComponent } from './home/edit-bid-listing/edit-bid-listing.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BidFormComponent } from './home/bid-listing/bid-form/bid-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatInputModule,MatIconModule, MatButtonModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { EnvServiceProvider } from './env.service.provider';
import { ServerUnavailableComponent } from './server-unavailable/server-unavailable.component';
import { MaterialModule } from '../../material-module';
import { HistoryComponent } from './home/history/history.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    PageNotFoundComponent,
    BidListingComponent,
    EditBidListingComponent,
    BidFormComponent,
    ServerUnavailableComponent,
    HistoryComponent
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
     ReactiveFormsModule ,
     HttpClientModule,
     LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: environment.loggerboolean,
    }),
    NgxSpinnerModule,
    NgxLoadingModule.forRoot({

    }),
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    InternationalPhoneNumberModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
      MatStepperModule, MatInputModule,MatIconModule, MatButtonModule,MaterialModule
  ],
  providers: [AuthGuard,DataService,AuthService,EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
