import { Component, OnInit } from '@angular/core';
import { DataCreateService } from 'src/app/services/data-create.service';

@Component({
  selector: 'app-success-create-employee',
  templateUrl: './success-create-employee.component.html',
  styleUrls: ['./success-create-employee.component.css']
})
export class SuccessCreateEmployeeComponent implements OnInit {
  dataEmployee: any

  constructor(private apiDatacreate: DataCreateService) {}
  ngOnInit(): void {
    this.data();
  }

  data() {
    this.apiDatacreate.getApiData().subscribe(async data => {
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this.dataEmployee = await data.data;
      }
    })
  }

}
