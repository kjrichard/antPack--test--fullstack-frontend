import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  public user: User;
  public registerForm  =   this.fb.group({

    name            :   [ '', [ Validators.required, Validators.minLength(8) ] ],
    username        :   [ '', [ Validators.required, Validators.minLength(4) ] ],
    email           :   [ '', [ Validators.email, Validators.required ]],
    phone           :   [ '', [ Validators.required, Validators.minLength(6) ]],
    website         :   [ '', [ Validators.required, Validators.minLength(6)]],
    street          :   [ '', [ Validators.required, Validators.minLength(4) ] ],
    suite           :   [ '', [ Validators.required, Validators.minLength(4) ]],
    city            :   [ '', [ Validators.required, Validators.minLength(4)]],
    zipcode         :   [ '',[ Validators.required, Validators.minLength(4) ] ],
    lat             :   [ '', [ Validators.required, Validators.minLength(4)]],
    lng             :   [ '',[ Validators.required, Validators.minLength(4) ] ],
    company         :   [ '',[ Validators.required, Validators.minLength(4) ] ],
    catchPhrase     :   [ '', [ Validators.required, Validators.minLength(4)]],
    bs              :   [ '',[ Validators.required, Validators.minLength(4) ] ],

  });

  constructor(

    private router: Router, 
    private fb: FormBuilder,
    private userService: UserService

  ) { 
    this.user = this.userService.user;
    if (this.user == null ) {
      router.navigateByUrl('/usuarios').then(() => { window.location.reload() });
    }

  }

  ngOnInit(): void {

    this.fields();
  }

  fields() {
      this.registerForm.disable()
      this.registerForm.controls.name.setValue(this.user.name);
      this.registerForm.controls.username.setValue(this.user.username);
      this.registerForm.controls.email.setValue(this.user.email);
      this.registerForm.controls.street.setValue(this.user.address.street);
      this.registerForm.controls.suite.setValue(this.user.address.suite);
      this.registerForm.controls.city.setValue(this.user.address.city);
      this.registerForm.controls.zipcode.setValue(this.user.address.zipcode);
      this.registerForm.controls.lat.setValue(this.user.address.geo.lat);
      this.registerForm.controls.lng.setValue(this.user.address.geo.lng);
      this.registerForm.controls.phone.setValue(this.user.phone);
      this.registerForm.controls.website.setValue(this.user.website);
      this.registerForm.controls.company.setValue(this.user.company.name);
      this.registerForm.controls.catchPhrase.setValue(this.user.company.catchPhrase);
      this.registerForm.controls.bs.setValue(this.user.company.bs)
    
  }

  validate(field: string): boolean {
    if( this.registerForm.get(field)?.invalid ) {
      return true;
    }
    return false;
  }

  cancel() {
    this.registerForm.reset();
    this.router.navigateByUrl('/usuarios');
  }

}
