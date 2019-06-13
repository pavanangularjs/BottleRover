import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-landing-page-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LandingPageLocationsComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  onStateSelect(state) {
    this.commonService.onStateSeleced(state);
  }

}
