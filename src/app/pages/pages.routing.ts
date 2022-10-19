import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';



const routes: Routes = [
    { 
        path: 'usuarios', 
        component: PagesComponent,
        children: [
            { path: '', component: UsersComponent, data: { titulo: 'Usuarios' } },
            { path: 'crear', component: RegisterUserComponent, data: { titulo: 'Registro de usuarios' } },
            { path: 'actualizar', component: UpdateUserComponent, data: { titulo: 'Atualizar  usuarios' } },
            { path: 'informacion', component: DetailUserComponent, data: { titulo: 'Informacion del  usuarios' } },
            
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


