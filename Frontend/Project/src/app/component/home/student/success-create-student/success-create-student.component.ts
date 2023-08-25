import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { createStudent } from 'src/app/interfaces/student/createStudent';
import { DataCreateService } from 'src/app/services/data-create.service';

@Component({
  selector: 'app-success-create-student',
  templateUrl: './success-create-student.component.html',
  styleUrls: ['./success-create-student.component.css']
})
export class SuccessCreateStudentComponent implements OnInit {
  dataStudent: any
  currentUrl = this.router.url;


  constructor(private apiDatacreate: DataCreateService, private router: Router,) {}

  ngOnInit(): void {
    this.data();
  }


  data() {
    this.apiDatacreate.getApiData().subscribe(async data => {
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this.dataStudent = await data.data;
      }
    })
  }

}
