import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomerLoginSession } from '../../models/customer-login-session';
import { ProductStoreSelectors } from '../../state/product-store/product-store.selector';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  storeDetails: any;
  constructor(private store: Store<CustomerLoginSession>) {
    this.store.select(ProductStoreSelectors.storeGetDetailsData)
      .subscribe(sgdd => {
        if (sgdd) {
          this.storeDetails = sgdd.GetStoredetails;
        }
      });
  }

  ngOnInit() {}

}
