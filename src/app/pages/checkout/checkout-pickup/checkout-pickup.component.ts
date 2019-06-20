import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductStoreService } from '../../../services/product-store.service';
import { ProductStoreSelectors } from '../../../state/product-store/product-store.selector';
@Component({
  selector: 'app-checkout-pickup',
  templateUrl: './checkout-pickup.component.html',
  styleUrls: ['./checkout-pickup.component.scss']
})
export class CheckoutPickupComponent implements OnInit {

  storeDetails: any;
  constructor(private store: Store<any>,
    private storeService: ProductStoreService) {
      this.store.select(ProductStoreSelectors.storeGetDetailsData)
      .subscribe(sgdd => {
        if (sgdd) {
          this.storeDetails = sgdd.GetStoredetails;
        }
      });
  }

  ngOnInit() {
  }

}
