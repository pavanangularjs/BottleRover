import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Store } from '@ngrx/store';
import { ProductStoreService } from '../../../services/product-store.service';
import { CustomerLoginSession } from '../../../models/customer-login-session';
import { CustomerSelectors } from '../../../state/customer/customer.selector';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { CommonService } from '../../../shared/services/common.service';

import { Router } from '@angular/router';

import { } from 'googlemaps';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page-search-by-address',
  templateUrl: './search-by-address.component.html',
  styleUrls: ['./search-by-address.component.scss']
})
export class LandingPageSearchByAddressComponent implements OnInit {
  latitude: number;
  longitude: number;
  address: string;
  storeList: any;
  storeList_25miles: any;
  storeList_50miles: any;
  matchedStoreList: any;
  searchText: string;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<CustomerLoginSession>,
    private progressBarService: ProgressBarService,
    private storeService: ProductStoreService,
    private commonService: CommonService,
    private router: Router) {
    this.store.select(CustomerSelectors.customerLoginSessionData)
      .subscribe(clsd => {
        if (clsd) {
          this.getStoreList();
        }
      });
  }

  ngOnInit() {
    // this.searchText = 'Dallas TX, USA';
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.commonService.searchText = place.formatted_address;

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.commonService.latitude = place.geometry.location.lat();
          this.commonService.longitude = place.geometry.location.lng();

          this.commonService.calculateDistance();
        });
      });
    });
  }

  getStoreList() {
    this.progressBarService.show();
    this.storeService.storeGetList().subscribe(data => {
      if (data && data.ListStore) {
        this.storeList = data.ListStore;
        this.commonService.allStoresList = data.ListStore;
        this.progressBarService.hide();
      }
    });
  }
}
