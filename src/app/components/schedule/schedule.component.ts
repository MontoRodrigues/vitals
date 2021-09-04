import { ISchedule, ISchedule_Input } from './../../interface/prescription';
import { IPatient } from './../../interface/Ipatient.interface';
import { ScheduleService } from './../../services/schedule.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  patientID:string ="";
  private pl:any |undefined;
  private sl:any |undefined;

  patient: IPatient | undefined;
  scheduleList: ISchedule[] | undefined;
  startDate:string ="";
  endDate:string ="";
  scheduleInput:ISchedule_Input ={
    StartDate: null,
    EndDate: null,
    Name:null,
    Schedule:{
        Time1:null,
        Time2:null,
        Time3:null,
        Time4:null,
        Time5:null,
    },
    Instruction: null,
    refremce:{
        uri1: null,
        uri2: null,
        uri3: null,
        uri4: null
    }
  };

  addSchedule():void{
    if(this.startDate =="" || this.endDate==""){
      Swal.fire({  
        icon: 'error',  
        title: 'Please select start and end dates',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
    return;
    }

    if(this.scheduleInput.Name ==null){
      Swal.fire({  
        icon: 'error',  
        title: 'Please Add a Schedule Name',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
    return;
    }

    if(this.scheduleInput.Schedule.Time1 ==null && this.scheduleInput.Schedule.Time2 ==null
      && this.scheduleInput.Schedule.Time3 ==null && this.scheduleInput.Schedule.Time4 ==null
      && this.scheduleInput.Schedule.Time5 ==null
      ){
      Swal.fire({  
        icon: 'error',  
        title: 'Please Add a Schedule Time',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
    return;
    }
    this.scheduleInput.StartDate = new Date(this.startDate);
    this.scheduleInput.EndDate = new Date(this.endDate);
    this.scheduleService.addSchedule(this.scheduleInput);

    this.scheduleInput ={
      StartDate: null,
      EndDate: null,
      Name:null,
      Schedule:{
          Time1:null,
          Time2:null,
          Time3:null,
          Time4:null,
          Time5:null,
      },
      Instruction: null,
      refremce:{
          uri1: null,
          uri2: null,
          uri3: null,
          uri4: null
      }
    }
  

  }

  constructor(private  route:ActivatedRoute,private router: Router, private scheduleService:ScheduleService )
  {
    
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      scheduleService.setPatientID(this.patientID);

      this.pl =scheduleService.patient$.subscribe(p =>{
        this.patient=p;
        //console.log(p);
      });

      this.sl =scheduleService.scheduleList$.subscribe(p =>{
        this.scheduleList=p;
        //console.log(p);
      });
      
  }
  
  ngOnInit(): void {
    
  }

}
