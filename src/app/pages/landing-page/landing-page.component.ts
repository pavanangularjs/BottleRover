import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomerLoginSession } from '../../models/customer-login-session';
import { CustomerLogin } from '../../state/customer/customer.action';
import { ProgressBarService } from '../../shared/services/progress-bar.service';
import * as CryptoJS from 'crypto-js';
import { baseUrl } from '../../services/url-provider';
import { AppConfigService } from '../../app-config.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  customerSession: CustomerLoginSession;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<CustomerLoginSession>,
    private progressBarService: ProgressBarService,
    private appConfig: AppConfigService) {

  }

  ngOnInit() {
    const storeId = this.route.snapshot.queryParams['storeID'];
    if (storeId) {
      this.appConfig.appID = 0;
      this.appConfig.storeID = +storeId;
    }
    const isSignIn = localStorage.getItem('isSignIn');
    const sourceId = localStorage.getItem('sourceId');

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (!(this.customerSession && this.customerSession.SessionId) && (isSignIn === '1' || isSignIn === null)) {
      // this.spinnerService.show();

      let demail = sessionStorage.getItem('email');
      let dpass = sessionStorage.getItem('password');

      if (demail && dpass) {
        demail = CryptoJS.AES.decrypt(demail, baseUrl.substr(3)).toString(CryptoJS.enc.Utf8);
        dpass = CryptoJS.AES.decrypt(dpass, baseUrl.substr(3)).toString(CryptoJS.enc.Utf8);
      } else {
        demail = localStorage.getItem('email');
        dpass = localStorage.getItem('password');

        try {
          if (demail && dpass) {
            demail = CryptoJS.AES.decrypt(demail, baseUrl.substr(3)).toString(CryptoJS.enc.Utf8);
            dpass = CryptoJS.AES.decrypt(dpass, baseUrl.substr(3)).toString(CryptoJS.enc.Utf8);
          }
        } catch {
          sessionStorage.removeItem('email');
          sessionStorage.removeItem('password');

          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('isSignIn');
          localStorage.removeItem('rememberMe');
          this.store.dispatch(new CustomerLogin(this.appConfig.getLoginCustomerParams()));
        }

      }

      this.progressBarService.show();
      if (demail && dpass) {
        this.store.dispatch(new CustomerLogin(this.appConfig.getLoginCustomerParams(demail, dpass, 'E')));
      } else if (demail && sourceId) {
        this.store.dispatch(new CustomerLogin(this.appConfig.getLoginCustomerParams(demail, '' , 'F', sourceId)));
      } else {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');

        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('isSignIn');
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('sourceId');
        this.store.dispatch(new CustomerLogin(this.appConfig.getLoginCustomerParams()));
      }
    } else if (!(this.customerSession && this.customerSession.SessionId) && (isSignIn === '0')) {
      this.store.dispatch(new CustomerLogin(this.appConfig.getLoginCustomerParams()));
    }
  }
}
