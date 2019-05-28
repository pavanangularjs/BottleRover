import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  cacheUpdated = new Subject<any>();
  orderPlaced = new Subject<boolean>();
  locationChanged = new Subject<any>();
  storeList: any;

  constructor() { }

  onCacheUpdated() {
    this.cacheUpdated.next();
  }

  onOrderPlaced(status: boolean) {
    this.orderPlaced.next(status);
  }

  onLocationChanged(location: any) {
    this.locationChanged.next(location);
  }
}
