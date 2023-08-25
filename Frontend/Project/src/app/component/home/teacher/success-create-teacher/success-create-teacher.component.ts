import { Component, OnInit } from '@angular/core';
import { DataCreateService } from 'src/app/services/data-create.service';

@Component({
  selector: 'app-success-create-teacher',
  templateUrl: './success-create-teacher.component.html',
  styleUrls: ['./success-create-teacher.component.css']
})
export class SuccessCreateTeacherComponent implements OnInit {
  dataTeacher: any

  constructor(private apiDatacreate: DataCreateService) {}

  ngOnInit(): void {
    this.data();
  }

  data() {
    this.apiDatacreate.getApiData().subscribe(async data => {
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this.dataTeacher = await data.data;
      }
    })
  }

}
