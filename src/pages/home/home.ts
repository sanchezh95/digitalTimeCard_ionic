import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  working = false;
  off = false;
  on = false;
  clockInTime;
  clockOutTime;
  hoursWorked;
  month;
  day;

  constructor(public navCtrl: NavController) {
    let date = new Date();
    this.month = date.toLocaleString('en-us', {month: 'long'});
    this.day = date.getDate();
  }

  clockIn() {
    this.working = true;
    this.on = true;
    this.clockInTime = this.getTime();
  }

  clockOut() {
    this.working = false;
    this.off = true;
    this.clockOutTime = this.getTime();

    // Calculate total hours worked
    // For 'regular' work hours - will not calculate > 12 hours of work
    let inTime = this.clockInTime.split(':');
    let outTime = this.clockOutTime.split(':');

    let inHr = parseInt(inTime[0]);
    let outHr = parseInt(outTime[0]);
    let inMin = parseInt(inTime[1]) / 60;
    let outMin = parseInt(outTime[1]) / 60;

    let clockIn = inHr + inMin;
    let clockOut = outHr + outMin;

    this.hoursWorked = clockOut - clockIn;
    this.hoursWorked = this.hoursWorked.toFixed(2);
  }

  getTime() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    // Format of time - HH:MM
    if (minutes < 10) {
      let min = '0' + minutes;
      return (hour + ':' + min);
    }
    else {
      return (hour + ':' + minutes);
    }
  }
}
