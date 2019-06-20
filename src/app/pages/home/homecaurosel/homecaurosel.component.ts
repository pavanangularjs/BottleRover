import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { ProductStoreService } from '../../../services/product-store.service';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { Store } from '@ngrx/store';
import { CustomerLoginSession } from '../../../models/customer-login-session';
import { ProductStoreSelectors } from '../../../state/product-store/product-store.selector';

@Component({
  selector: 'app-homecaurosel',
  templateUrl: './homecaurosel.component.html',
  styleUrls: ['./homecaurosel.component.scss']
})
export class HomecauroselComponent implements OnInit {
@Input() eventList: any;
isShowFilters = false;
categoryFilters: any;
storeDetails: any;
currentStoreId: number;
storeIdInStoreDetails: number;

  constructor(private store: Store<CustomerLoginSession>,
    private router: Router,
    public dataservice: DataService,
    private storeService: ProductStoreService,
    private progressBarService: ProgressBarService) {
      // this.storeDetails = null;

      this.store.select(ProductStoreSelectors.storeGetDetailsData)
      .subscribe(sgdd => {
        if (sgdd) {
          this.storeDetails = sgdd.GetStoredetails;
          this.storeIdInStoreDetails = sgdd.StoreId;
          this.currentStoreId = +localStorage.getItem('storeId');
        }
      });
     }

  ngOnInit() {
    // this.getStoreDetails();
  }

  showFilters(categoryId) {
    this.isShowFilters = true;
    this.categoryFilters = { 'CategoryId': categoryId};
  }

  showProducts(catId, catName) {
    this.dataservice.searchByText = '';
    this.dataservice.categoryId = catId;
    this.dataservice.getFiltersByCategory();
    this.router.navigate([`/${catName}`]);
  }

  onApplyFilter() {
    this.isShowFilters = false;
  }

  /* getStoreDetails() {
    this.progressBarService.show();
    this.storeService.getStoreDetails().subscribe(data => {
      if (data && data.GetStoredetails) {
        this.storeDetails = data.GetStoredetails;
      }
      this.progressBarService.hide();
    });
  }*/
}
