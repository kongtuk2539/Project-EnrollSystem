import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CreateStudentComponent } from './component/home/student/create-student/create-student.component';
import { SuccessCreateStudentComponent } from './component/home/student/success-create-student/success-create-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', loadChildren: () => import('./component/home/home.module').then(x => x.HomeModule) },
  { path: 'create-student', component: CreateStudentComponent},
  { path: 'success-create-student', component: SuccessCreateStudentComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
