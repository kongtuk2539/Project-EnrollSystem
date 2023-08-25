import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module'
import { HomeComponent } from './home.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { EmployeeComponent } from './employee/employee.component';
import { ReportesComponent } from './reportes/reportes.component';
import { StartComponent } from './start/start.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { ConfirmDialogCreateEmpComponent } from './employee/confirm-dialog-create-emp/confirm-dialog-create-emp.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ConfirmDialogEditEmpComponent } from './employee/confirm-dialog-edit-emp/confirm-dialog-edit-emp.component';
import { ConfirmDialogDeleteEmpComponent } from './employee/confirm-dialog-delete-emp/confirm-dialog-delete-emp.component';
import { StudentComponent } from './student/student.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { ConfirmDialogCreateStuComponent } from './student/confirm-dialog-create-stu/confirm-dialog-create-stu.component';
import { EditStudentComponent } from './student/edit-student/edit-student.component';
import { ConfirmDialogEditStuComponent } from './student/confirm-dialog-edit-stu/confirm-dialog-edit-stu.component';
import { ConfirmDialogDeleteStuComponent } from './student/confirm-dialog-delete-stu/confirm-dialog-delete-stu.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { ConfirmDialogCreateTecComponent } from './teacher/confirm-dialog-create-tec/confirm-dialog-create-tec.component';
import { EditTeacherComponent } from './teacher/edit-teacher/edit-teacher.component';
import { ConfirmDialogEditTecComponent } from './teacher/confirm-dialog-edit-tec/confirm-dialog-edit-tec.component';
import { ConfirmDialogDeleteTecComponent } from './teacher/confirm-dialog-delete-tec/confirm-dialog-delete-tec.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';
import { ConfirmDialogCreateSubComponent } from './subject/confirm-dialog-create-sub/confirm-dialog-create-sub.component';
import { ConfirmDialogEditSubComponent } from './subject/confirm-dialog-edit-sub/confirm-dialog-edit-sub.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';
import { ConfirmDialogDeleteSubComponent } from './subject/confirm-dialog-delete-sub/confirm-dialog-delete-sub.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCourseComponent } from './course/create-course/create-course.component';
import { ConfirmDialogCreateCourseComponent } from './course/confirm-dialog-create-course/confirm-dialog-create-course.component';
import { EditCourseComponent } from './course/edit-course/edit-course.component';
import { ConfirmDialogEditCourseComponent } from './course/confirm-dialog-edit-course/confirm-dialog-edit-course.component';
import { EnrollComponent } from './enroll/enroll.component';
import { EnrollDataComponent } from './enroll/enroll-data/enroll-data.component';
import { EnrollInformationComponent } from './enroll/enroll-information/enroll-information.component';
import { ConfirmDialogEnrollComponent } from './enroll/confirm-dialog-enroll/confirm-dialog-enroll.component';
import { PayBillComponent } from './enroll/pay-bill/pay-bill.component';
import { AddScoreComponent } from './enroll/add-score/add-score.component';
import { ConfirmDialogPaybillComponent } from './enroll/pay-bill/confirm-dialog-paybill/confirm-dialog-paybill.component';
import { ReceiptCheckComponent } from './enroll/receipt-check/receipt-check.component';
import { ConfirmDialogReceiptCheckComponent } from './enroll/receipt-check/confirm-dialog-receipt-check/confirm-dialog-receipt-check.component';
import { ConfirmDialogAddscoreComponent } from './enroll/add-score/confirm-dialog-addscore/confirm-dialog-addscore.component';
import { ConfirmDialogCancelComponent } from './enroll/enroll-data/confirm-dialog-cancel/confirm-dialog-cancel.component';
import { SuccessCreateStudentComponent } from './student/success-create-student/success-create-student.component';
import { SuccessCreateEmployeeComponent } from './employee/success-create-employee/success-create-employee.component';
import { SuccessCreateTeacherComponent } from './teacher/success-create-teacher/success-create-teacher.component';



@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        EmployeeComponent,
        ReportesComponent,
        StartComponent,
        CreateEmployeeComponent,
        ConfirmDialogCreateEmpComponent,
        EditEmployeeComponent,
        ConfirmDialogEditEmpComponent,
        ConfirmDialogDeleteEmpComponent,
        StudentComponent,
        CreateStudentComponent,
        ConfirmDialogCreateStuComponent,
        EditStudentComponent,
        ConfirmDialogEditStuComponent,
        ConfirmDialogDeleteStuComponent,
        TeacherComponent,
        CreateTeacherComponent,
        ConfirmDialogCreateTecComponent,
        EditTeacherComponent,
        ConfirmDialogEditTecComponent,
        ConfirmDialogDeleteTecComponent,
        SubjectComponent,
        CreateSubjectComponent,
        ConfirmDialogCreateSubComponent,
        ConfirmDialogEditSubComponent,
        EditSubjectComponent,
        ConfirmDialogDeleteSubComponent,
        CourseComponent,
        CreateCourseComponent,
        ConfirmDialogCreateCourseComponent,
        EditCourseComponent,
        ConfirmDialogEditCourseComponent,
        EnrollComponent,
        EnrollDataComponent,
        EnrollInformationComponent,
        ConfirmDialogEnrollComponent,
        PayBillComponent,
        AddScoreComponent,
        ConfirmDialogPaybillComponent,
        ReceiptCheckComponent,
        ConfirmDialogReceiptCheckComponent,
        ConfirmDialogAddscoreComponent,
        ConfirmDialogCancelComponent,
        SuccessCreateStudentComponent,
        SuccessCreateEmployeeComponent,
        SuccessCreateTeacherComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
      //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ]
})
export class HomeModule { }
