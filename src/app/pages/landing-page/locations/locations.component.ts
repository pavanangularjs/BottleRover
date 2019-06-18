import { Component, OnInit, NgZone  } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LandingPageLocationsComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  onStateSelect(state) {

    this.commonService.searchText = state;
    this.commonService.getLocation(state);
  }

}

