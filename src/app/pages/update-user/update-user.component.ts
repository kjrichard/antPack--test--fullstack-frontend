import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

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
    console.log(this.user);
    
    if (this.user == null ) {
      router.navigateByUrl('/usuarios').then(() => { window.location.reload() });
    }

  }

  ngOnInit(): void {

    this.fields();
  }

  fields() {
    
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

  updateUser() {
        let data: User =  { 
          "id": this.user.id,
          "name": this.registerForm.get('name').value,
          "username": this.registerForm.get('username').value,
          "email": this.registerForm.get('email').value,
          "address": {
            "street": this.registerForm.get('street').value,
            "suite": this.registerForm.get('suite').value,
            "city": this.registerForm.get('city').value,
            "zipcode": this.registerForm.get('zipcode').value,
            "geo": {
              "lat": this.registerForm.get('lat').value,
              "lng": this.registerForm.get('lng').value,
            }
          },
          "phone": this.registerForm.get('phone').value,
          "website": this.registerForm.get('website').value,
          "company": {
            "name": this.registerForm.get('company').value,
            "catchPhrase": this.registerForm.get('catchPhrase').value,
            "bs": this.registerForm.get('bs').value
          }
        } 
        console.log(data);
        

        this.userService.updateUser( data.id, data ).subscribe( ( res ) => {
        console.log( res );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Operacion Exitosa',
          showConfirmButton: false,
          timer: 1500
        })
        }, ( error ) => {
        console.log( error );
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se completo la operacion',
          showConfirmButton: false,
          timer: 1500
        })
        })
   }

}

