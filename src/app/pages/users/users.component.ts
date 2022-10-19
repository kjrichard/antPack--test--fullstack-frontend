import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  public user: User;
 

  constructor( private userService: UserService, public router: Router ) { }

  ngOnInit(): void {

    this.createUserAll();
   
  }

  createUserAll() {
    this.userService.createUserAll().subscribe( ( res: User ) => {
      this.user = res;
      this.getUsers();
      
    }, ( error ) => {
      console.log(error);
    })
  }

  createUser() {
    this.router.navigateByUrl('usuarios/crear')
  }

  updateUser( item: User ) {
    this.userService.user = item;
    this.router.navigateByUrl('usuarios/actualizar')
  }

  detail( item: User ) {
    this.userService.user = item;
    this.router.navigateByUrl('usuarios/informacion')
  }

  getUsers() {
    this.userService.getUsers().subscribe( ( res: User ) => {
      console.log(res);
      
     this.user = res;
      
    })
  }

  delete( id: number ) {
    Swal.fire({
      title: 'Estas segur@?',
      text: "No podrás revertir esto.!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete( id ).subscribe( ( res: User ) => {
          this.getUsers();
          Swal.fire(
            'Deleted!',
            'Registro eliminado.',
            'success',
          )

        }, ( error) => {
          console.log(error);
          
        })
        
      }
    })

  }

}
