import { Component, OnInit, Input } from '@angular/core';
import { AddMobileService } from './add-mobile.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})
export class AddMobileComponent implements OnInit {

  @Input() showMePartially: boolean;
  registerForm: FormGroup;
  submitted = false;

  constructor(private addMobileService: AddMobileService,private formBuilder: FormBuilder) { }
  image:boolean;
  ngOnInit() {
    this.editable
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      manufacturer:['',Validators.required],
      os:['',Validators.required],
      version:['',Validators.required],
      ram:['',Validators.required],
      internal:['',Validators.required],
      expandable:['',Validators.required],
      width:['',Validators.required],
      depth:['',Validators.required],
      height:['',Validators.required],
      battery:['',Validators.required],
      weight:['',Validators.required],
      price:['',Validators.required],
      stock:['',Validators.required],


  });
  }
  get f() { return this.registerForm.controls; }

   onSubmit1() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        console.log(this.mobile)
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
        console.log("Size:"+file.size)
        console.log("Size:"+file.type)
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
