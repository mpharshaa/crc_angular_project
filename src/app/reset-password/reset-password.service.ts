import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Captcha } from 'src/app/Models/captcha';
import { Observable } from 'rxjs';
import {DataService} from 'src/app/data.service';
import {ChangePasswordModel} from 'src/app/Models/changePassword'

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  captchaURL = environment.captchaUrl;
  constructor( private DataService:DataService) { }
  getResetPasswordCaptcha(): Observable<Captcha> {
    return this.DataService.getCaptcha();
  }

  resetPasswordService(changePasswordData:ChangePasswordModel){
    return this.DataService.changePasswordService(changePasswordData);
  }
}
