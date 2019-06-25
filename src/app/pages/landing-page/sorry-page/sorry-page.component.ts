import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarService } from '../../../shared/services/progress-bar.service';
import { ContactUsService } from '../../../services/contact-us.service';

@Component({
  selector: 'app-sorry-page',
  templateUrl: './sorry-page.component.html',
  styleUrls: ['./sorry-page.component.scss']
})
export class SorryPageComponent implements OnChanges {
  @Input() userProfile: any;
  @ViewChild('openSorryModal') openModal: ElementRef;
  formContactUs: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private progressBarService: ProgressBarService,
    private contactUsService: ContactUsService,
    ) { }

  ngOnChanges() {
    this.submitted = false;
    this.formContactUs = this.formBuilder.group({
      storeName: ['', [Validators.required, Validators.maxLength(40)]],
      location: ['', [Validators.required]],
      phone: ['', []],
    });
  }

  get f() { return this.formContactUs.controls; }

  closeMe() {
    this.openModal.nativeElement.click();
  }

  onSubmit() {
    this.submitted = true;

    if (this.formContactUs.invalid) {
      return;
    }

    const contactUsRequestPayload = {
      ContactUsEmail: (this.userProfile && this.userProfile.EmailId) ? this.userProfile.EmailId : 'Not Available',
      Subject: 'New Store Add Request',
      Message: `Store Name: ${this.formContactUs.get('storeName').value}, Location: ${this.formContactUs.get('location').value}`,
      Phone: this.formContactUs.get('phone').value || 'Not Available',
      Name: this.userProfile ? `${this.userProfile.FirstName} ${this.userProfile.LastName}` : 'Not Available',
      StoreId: 0, SessionId: '', UserId: 0, AppId: 0, DeviceId: '', DeviceType: ''
    };

    if (contactUsRequestPayload.Phone.length > 14) {
      contactUsRequestPayload.Phone = contactUsRequestPayload.Phone.substring(0, 14);
    }

    this.progressBarService.show();

    this.contactUsService.SendContactUsMessage(contactUsRequestPayload).subscribe((res) => {
      this.openModal.nativeElement.click();
      if (res && res.SuccessMessage !== '') {
        this.toastr.success(res.SuccessMessage);
        this.formContactUs.reset();
        this.submitted = false;
      } else {
        this.toastr.error(res.ErrorMessage);
      }
      this.progressBarService.hide();
    },
      error => {
        this.toastr.error(error);
        this.progressBarService.hide();
      });
  }

}
