import { Component, OnInit } from '@angular/core';
import { CustomerSelectors } from '../../../state/customer/customer.selector';
import { Store } from '@ngrx/store';
import { CustomerLoginSession } from '../../../models/customer-login-session';
import { AppConfigService } from '../../../app-config.service';
import { CustomerLogin } from '../../../state/customer/customer.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LandingPageHeaderComponent implements OnInit {
  isLogin = false;

  constructor(private store: Store<CustomerLoginSession>,
    private appConfig: AppConfigService,
    private router: Router) {
    this.store.select(CustomerSelectors.customerLoginSessionData)
      .subscribe(clsd => {
        if (clsd) {
          if (clsd.UserId !== 0) {
            this.isLogin = true;
          } else {
            this.isLogin = false;
          }
        }
      });
   }

  ngOnInit() {
  }

  onSignOut() {
    sessionStorage.clear();
    localStorage.setItem('isSignIn', '0');
    localStorage.removeItem('storeId');
    // localStorage.removeItem(key);  for removing a single item
    location.reload();
    this.store.dispatch(new CustomerLogin(this.appConfig.getLoginCustomerParams()));
    this.router.navigate(['/home']);
  }

}
