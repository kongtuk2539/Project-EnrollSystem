import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataScore } from 'src/app/interfaces/enroll/dataScore';
import { EnrollService } from 'src/app/services/enroll.service';
import { ConfirmDialogAddscoreComponent } from './confirm-dialog-addscore/confirm-dialog-addscore.component';

@Component({
  selector: 'app-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent implements OnInit {
  scoreForm!: FormGroup;
  get_couID: any = this.router.snapshot.paramMap.get('cou_ID')
  get_stuID: any = this.router.snapshot.paramMap.get('stu_ID')


  constructor(private enrollSer: EnrollService, private fb: FormBuilder, private router: ActivatedRoute,
    private _snackBar: MatSnackBar, private routerLink: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.scoreForm = this.fb.group({
      cou_ID: ['', Validators.required],
      stu_ID: ['', Validators.required],
      sub_Name: ['', Validators.required],
      stu_Name: ['', Validators.required],
      score_1: ['', Validators.required],
      score_2: ['', Validators.required],
      score_3: ['', Validators.required],
      score_final: ['', Validators.required],
      date_class1: [''],
      date_class2: [''],
      date_class3: [''],
      date_class4: [''],
    })

    this.scoreForm.patchValue({
      cou_ID: this.get_couID,
      stu_ID: this.get_stuID
    })

    this.enrollSer.searchCourse(this.get_couID, "").subscribe((data => {
      this.scoreForm.patchValue({
        sub_Name: data.data[0].sub_Name
      })
    }))

    this.enrollSer.searchStudent(this.get_stuID, "").subscribe((data => {
      this.scoreForm.patchValue({
        stu_Name: data.data[0].stu_Name
      })
    }))
  }

  AddScore() {
    const dataForm = this.scoreForm.value
    var dateClass1 = new DatePipe('en-US').transform(dataForm.date_class1, 'yyyy/M/d')
    var dateClass2 = new DatePipe('en-US').transform(dataForm.date_class2, 'yyyy/M/d')
    var dateClass3 = new DatePipe('en-US').transform(dataForm.date_class3, 'yyyy/M/d')
    var dateClass4 = new DatePipe('en-US').transform(dataForm.date_class4, 'yyyy/M/d')
    const dataScore: DataScore = {
      stu_ID: dataForm.stu_ID,
      cou_ID: dataForm.cou_ID,
      score_1: dataForm.score_1,
      score_2: dataForm.score_2,
      score_3: dataForm.score_3,
      score_final: dataForm.score_final,
      date_class1: dateClass1!,
      date_class2: dateClass2!,
      date_class3: dateClass3!,
      date_class4: dateClass4!,
    }

    this.enrollSer.AddScore(dataScore).subscribe((data => {
      this._snackBar.open(data.message, 'close',{
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      if(data.message == "บันทึกข้อมูลสำเร็จ"){
        this.routerLink.navigate(['/home/enroll-information',dataForm.cou_ID, dataForm.stu_ID])
      }
    }))
  }

  dialogAddScore () {
    const dialogRef = this.dialog.open(ConfirmDialogAddscoreComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this.AddScore()
      }
      });
  }
}
