import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Store } from '@ngrx/store';
import { ProductStoreService } from '../../../services/product-store.service';
import { CustomerLoginSession } from '../../../models/customer-login-session';
import { CustomerSelectors } from '../../../state/customer/customer.selector';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { CommonService } from '../../../shared/services/common.service';
import { SessionService } from '../../../shared/services/session.service';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../app-config.service';
import { } from 'googlemaps';

@Component({
  selector: 'app-landing-page-storelocations',
  templateUrl: './store-locations.component.html',
  styleUrls: ['./store-locations.component.scss']
})
export class LandingPageStorelocationsComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;

  latitude: number;
  longitude: number;
  storeList: any;
  storeList_25miles: any;
  storeList_50miles: any;
  matchedStoreList: any;
  zoom: number;

  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<CustomerLoginSession>,
    private progressBarService: ProgressBarService,
    private storeService: ProductStoreService,
    private commonService: CommonService,
    private router: Router,
    private appConfig: AppConfigService,
    private sessionService: SessionService) {

      this.latitude = 17.473589;
      this.longitude = 78.38514459999999;

     this.store.select(CustomerSelectors.customerLoginSessionData)
    .subscribe(clsd => {
      if (clsd) {
        this.getStoreList();
      }
    });

    this.matchedStoreList = this.commonService.storeList;
    this.latitude = this.commonService.latitude;
    this.longitude = this.commonService.longitude;
  }

  ngOnInit() {

    this.zoom = 12;
    this.mapsAPILoader.load().then(() => {
      // this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          this.router.navigate(['/store-locations']);
          // this.commonService.onLocationChanged({'lat': this.latitude, 'long': this.longitude});
          this.calculateDistance();
        });
      });
    });
  }

  getStoreList() {
    this.progressBarService.show();
    this.storeService.storeGetList().subscribe(data => {
      if (data && data.ListStore) {
        this.storeList = data.ListStore;
        this.progressBarService.hide();
      }
    });
  }

  calculateDistance() {
    const searchLocation = new google.maps.LatLng(this.latitude, this.longitude);

    this.storeList_25miles = [];
    this.storeList_50miles = [];

    this.storeList.forEach(item => {
      const store = new google.maps.LatLng(item.Latitude, item.Longitude);
      let distance = google.maps.geometry.spherical.computeDistanceBetween(store, searchLocation);

      if (distance) {
        distance = distance / 1609.344;

        if (distance <= 25) {
          this.storeList_25miles.push({'miles' : distance, 'store': item});
        } else if (distance <= 50) {
          this.storeList_50miles.push({'miles' : distance, 'store': item});
        }
      }
    });

    console.log('25 miles List');
    console.log(this.storeList_25miles);
    console.log('50 miles List');
    console.log(this.storeList_50miles);

    this.matchedStoreList = [];

    if (this.storeList_25miles.length > 0) {
      this.matchedStoreList = this.storeList_25miles.sort((x, y) => x.miles < y.miles ? -1 : 1);
    } else if (this.storeList_50miles.length > 0) {
      this.matchedStoreList = this.storeList_50miles.sort((x, y) => x.miles < y.miles ? -1 : 1);
    }

    this.commonService.storeList = this.matchedStoreList;
    this.commonService.latitude = this.latitude;
    this.commonService.longitude = this.longitude;
  }

  navToStore(storeInfo) {
    console.log(JSON.stringify(storeInfo));
    this.appConfig.storeID = storeInfo.store.StoreId;
    localStorage.setItem('storeId', storeInfo.store.StoreId.toString());
    this.sessionService.createNewSession();
    this.router.navigate(['/store']);
  }

}
