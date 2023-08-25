import { Time } from "@angular/common";

export interface paySlip {
  cou_ID: string;
  stu_ID: string;
  pay_time: Time;
  pay_date: Date;
  filePaySlip: any;
}
