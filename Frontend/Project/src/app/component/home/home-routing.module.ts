import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { HomeComponent } from './home.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { EnrollDataComponent } from './enroll/enroll-data/enroll-data.component';
import { EnrollInformationComponent } from './enroll/enroll-information/enroll-information.component';
import { EnrollComponent } from './enroll/enroll.component';
import { ReportesComponent } from './reportes/ReportesComponent';
import { StartComponent } from './start/start.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { StudentComponent } from './student/student.component';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './teacher/edit-teacher/edit-teacher.component';
import { TeacherComponent } from './teacher/teacher.component';
import { PayBillComponent } from './enroll/pay-bill/pay-bill.component';
import { AddScoreComponent } from './enroll/add-score/add-score.component';
import { ReceiptCheckComponent } from './enroll/receipt-check/receipt-check.component';
import { IsAuthenticatedGuard } from '../routeguard/is-authenticated.guard';
import { HasRoleGuard } from '../guardHasRole/has-role.guard';
import { SuccessCreateStudentComponent } from './student/success-create-student/success-create-student.component';
import { SuccessCreateEmployeeComponent } from './employee/success-create-employee/success-create-employee.component';
import { SuccessCreateTeacherComponent } from './teacher/success-create-teacher/success-create-teacher.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {
    // path: '', component: HomeComponent, canActivate: [IsAuthenticatedGuard],
    path: '', component: HomeComponent,
    children: [
      { path: '', component: StartComponent },
      { path: 'employee', component: EmployeeComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'reportes', component: ReportesComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'success-create-employee', component: SuccessCreateEmployeeComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'create-employee', component: CreateEmployeeComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'edit-employee/:emp_ID', component: EditEmployeeComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'student', component: StudentComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'success-create-student', component: SuccessCreateStudentComponent },
      { path: 'create-student', component: CreateStudentComponent },
      { path: 'edit-student/:stu_ID', component: EditStudentComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Student"] } },
      { path: 'teacher', component: TeacherComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'success-create-teacher', component: SuccessCreateTeacherComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'create-teacher', component: CreateTeacherComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'edit-teacher/:tec_ID', component: EditTeacherComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Teacher"] } },
      { path: 'subject', component: SubjectComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'create-subject', component: CreateSubjectComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'edit-subject/:sub_ID', component: EditSubjectComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'course', component: CourseComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Student", "Teacher"] } },
      { path: 'course/:stu_ID', component: CourseComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Student"] } },
      { path: 'course/tec/:tec_ID', component: CourseComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Teacher"] } },
      { path: 'create-course', component: CreateCourseComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'edit-course/:cou_ID', component: EditCourseComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'enroll/:cou_ID', component: EnrollComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Teacher", "Student"] } },
      { path: 'enroll/:cou_ID/:stu_ID', component: EnrollComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Student"] } },
      { path: 'enroll-data/:cou_ID', component: EnrollDataComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Teacher"] } },
      { path: 'enroll-data/:cou_ID/:stu_ID', component: EnrollDataComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Student"] } },
      { path: 'enroll-information/:cou_ID/:stu_ID', component: EnrollInformationComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Teacher", "Student"] } },
      { path: 'pay-bill/:cou_ID/:stu_ID', component: PayBillComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Teacher", "Student"] } },
      { path: 'add-score/:cou_ID/:stu_ID', component: AddScoreComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Teacher"] } },
      { path: 'receipt-check/:cou_ID/:stu_ID', component: ReceiptCheckComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee"] } },
      { path: 'contact-us', component: ContactUsComponent, canActivate: [IsAuthenticatedGuard, HasRoleGuard], data: { role: ["Employee", "Teacher", "Student"] } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
