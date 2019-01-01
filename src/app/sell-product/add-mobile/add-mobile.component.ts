import { Component, OnInit, Input } from '@angular/core';
import { AddMobileService } from './add-mobile.service';

@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})
export class AddMobileComponent implements OnInit {

  @Input() showMePartially: boolean;

  constructor(private addMobileService: AddMobileService) { }
  image:boolean;
  ngOnInit() {
    this.editable
  }

  closeMobile() {
    this.showMePartially = false;
  }
  mobile: any = {
    file: []
  };
  private base64textString: String = "";
  imgSrc: {};
  editable:boolean;
  openMobile() {
    this.showMePartially = true;
  }
  selectFile(evt) {
    var files = evt.target.files;
    for (let i = 0; i < files.length; i++) {
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
      }
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.imgSrc = "data:image/jpeg;base64," + this.base64textString
    this.mobile.file.push(this.base64textString);
    console.log(this.mobile.file.length)
  }

  onSubmit() {
    if(!this.editable)
    {
      this.addMobileService.addMobile(this.mobile)
      this.showMePartially = false;
    }
    else{
      this.addMobileService.updateMobile(this.mobile);
      this.showMePartially = false;
    }
    window.location.href="/sell";
  }
  versions: [];
  chooseOS(value) {
    this.mobile.os = value;
    this.addMobileService.getVersion(value).subscribe((data: []) => {
      this.versions = data;
    });
  }
  chooseVersion(value) {
    this.mobile.version = value;
  }

  viewEditableData(mobile: any) {
    this.editable=true;
    this.mobile = mobile;
    this.chooseOS(this.mobile.os);
    this.showMePartially = true;
  }

}
