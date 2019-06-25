import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  cacheUpdated = new Subject<any>();
  orderPlaced = new Subject<boolean>();
  locationChanged = new Subject<any>();
  stateSelected = new Subject<any>();
  noStores = new Subject<boolean>();
  storeList: any;
  allStoresList: any;
  latitude: number;
  longitude: number;
  searchText: string;

  constructor(private ngZone: NgZone, private router: Router) { }

  onCacheUpdated() {
    this.cacheUpdated.next();
  }

  onOrderPlaced(status: boolean) {
    this.orderPlaced.next(status);
  }

  onLocationChanged(location: any) {
    this.locationChanged.next(location);
  }

  onStateSeleced(state: any) {
    this.stateSelected.next(state);
  }

  calculateDistance() {
    const searchLocation = new google.maps.LatLng(this.latitude, this.longitude);

    const storeList_25miles = [];
    const storeList_50miles = [];

    this.allStoresList.forEach(item => {
      const store = new google.maps.LatLng(item.Latitude, item.Longitude);
      let distance = google.maps.geometry.spherical.computeDistanceBetween(store, searchLocation);

      if (distance) {
        distance = distance / 1609.344;

        if (distance <= 25) {
          storeList_25miles.push({'miles' : distance, 'store': item});
        } else if (distance <= 50) {
          storeList_50miles.push({'miles' : distance, 'store': item});
        }
      }
    });

    /* console.log('25 miles List');
    console.log(storeList_25miles);
    console.log('50 miles List');
    console.log(storeList_50miles); */

    this.storeList = [];

    if (storeList_25miles.length > 0) {
      this.storeList = storeList_25miles.sort((x, y) => x.miles < y.miles ? -1 : 1);
    } else if (storeList_50miles.length > 0) {
      this.storeList = storeList_50miles.sort((x, y) => x.miles < y.miles ? -1 : 1);
    }

    if (this.storeList && this.storeList.length > 0) {
      if (this.router.url !== '/store-locations') {
        this.router.navigate(['/store-locations']);
      }
    } else {
      this.noStores.next(true);
    }
  }

  getLocation(address: string) {
    // console.log('Getting address: ', address);
    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.ngZone.run(() => {
        // console.log(results);
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        this.calculateDistance();
        });
      } else {
        console.log('Error: ', results, ' & Status: ', status);
      }
    });
  }

}
