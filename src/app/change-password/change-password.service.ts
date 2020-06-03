import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { Captcha } from 'src/app/Models/captcha'
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { ChangePasswordModel } from 'src/app/Models/changePassword'
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  captchaURL = environment.captchaUrl;

  constructor(private DataService: DataService) { }


  getChangePasswordCaptcha(): Observable<Captcha> {
    return this.DataService.getCaptcha();
  }

  changePasswordService(changePasswordData: ChangePasswordModel): Observable<any> {
    return this.DataService.firstTimeChangePasswordService(changePasswordData);
  }
  updateVendorStatus(userId) {
    return this.DataService.updateVendorStatus(userId);
  }
}
