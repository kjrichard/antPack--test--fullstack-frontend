import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {


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

  ) { }

  ngOnInit(): void {
  }

  validate(field: string): boolean {
    if( this.registerForm.get(field)?.invalid ) {
      return true;
    }
    return false;
  }

   createUser() {
    
      let data: User =  { 
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

      this.userService.createUser( data ).subscribe( ( res ) => {
        console.log( res );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'YOperacion Exitosa',
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

  cancel() {
    this.registerForm.reset();
    this.router.navigateByUrl('/usuarios');
  }



}
