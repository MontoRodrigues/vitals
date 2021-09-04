import { IPatient } from './../../interface/Ipatient.interface';
import { element } from 'protractor';
import { IBloodPressure_input, IOxygen_input, ISugar_input, ITemperature_input, Ivitals_error } from './../../interface/Ivital.interface';
import { VitalsService } from './../../services/vitals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2'; 


export interface Item { 
  VitalName: string; 
  value1: boolean; 
  value1Name: string; };



@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit{

  

  patient: IPatient | undefined; 
  private pl:any |undefined;
  patientID:string ="";

  bp:IBloodPressure_input = {
    Status: "",
    diastolic:0,
    systolic: 0,
    pulse:0,
    date: null
  };

  bp_error:Ivitals_error={
    error:"No error",
    show:false
  }
  ox:IOxygen_input ={
    SpO2:0,
    pulse:0,
    date:  null
  }

  ox_error:Ivitals_error={
    error:"No error",
    show:false
  }

  sg:ISugar_input ={
    sugarLevel:0,
    date: null
  }

  sg_error:Ivitals_error={
    error:"No error",
    show:false
  }

  tmp:ITemperature_input ={
    temp:0,
    date: null
  }

  tmp_error:Ivitals_error={
    error:"No error",
    show:false
  }

  bp_date : string ="";

  setNow(){
    let date = new Date();

    let day:any = date.getDate(),
        month:any = date.getMonth() + 1,
        year:any = date.getFullYear(),
        hour:any = date.getHours(),
        min:any  = date.getMinutes();
    
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;

    this.bp_date =year + "-" + month + "-" + day +"T"+hour+":"+min;
  }
 


  // addBP(){
  //   this.bp.systolic
  // }
  addVitals(){

    let r:string ="";
    this.bp.date = new Date(this.bp_date);
    this.ox.date = new Date(this.bp_date);
    this.sg.date = new Date(this.bp_date);
    this.tmp.date = new Date(this.bp_date);

    //---------Blood Pressure-----
    if (this.bp.systolic>0 && this.bp.diastolic>0 && this.bp.pulse>0){
      if(this.bp.diastolic<this.bp.systolic){
        this.bp.Status =this.getStatus(this.bp.systolic,this.bp.diastolic);
        this.vs.add_BloodPressure(this.bp,this.patientID);
        this.bp_error.show=false;
        this.bp={
          Status: "",
          diastolic:0,
          systolic: 0,
          pulse:0,
          date: null
        };
        r+="Blood Pressure, "
      }
      else{
        this.bp_error.error="Systolic pressure should be greater than Diastolic pressure!";
        this.bp_error.show=true;
      }
    }
    else{
      this.bp_error.error="Please fill the values for Blood Pressure";
      this.bp_error.show=true;
    }
    //-------------------


    //---------Oxygen------------
      if(this.ox.SpO2>0 && this.ox.pulse>0){
        this.vs.add_Oxygen(this.ox,this.patientID);
        this.ox_error.show=false;
        this.ox={
          SpO2:0,
          pulse:0,
          date:  null
        };
        r+="SpO2, "
      }
      else{
        this.ox_error.error="Please fill the values for Oximeter";
        this.ox_error.show=true;
      }
    //---------------------------

    //-----Sugar
      if(this.sg.sugarLevel>0){
        this.vs.add_Sugar(this.sg,this.patientID);
        this.sg_error.show=false;
        this.sg={
          sugarLevel:0,
          date: null
        };
        r+="Sugar, "
      }
      else{
        this.sg_error.error="Please fill the values for Glucometer";
        this.sg_error.show=true;
      }
    //-----

    //-----Temperature
    if(this.tmp.temp>0){
      this.vs.add_Temperature(this.tmp,this.patientID);
      this.tmp_error.show=false;
      this.tmp={
        temp:0,
        date: null
      };
      r+="Temperature, "
    }
    else{
      this.tmp_error.error="Please fill the values for Thermometer";
      this.tmp_error.show=true;
    }

    if(r.length>0){
      Swal.fire({  
        icon: 'success',  
        title: 'Added '+ r +' Scucessfully',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
    }
  //-----
    // console.log(this.bp);
    // console.log(this.ox);
    // console.log(this.sg);
    // console.log(this.tmp);

  }

  constructor(private  route:ActivatedRoute,private router: Router, private vs:VitalsService )
  {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      vs.setPatientId(this.patientID);

      this.pl =vs.patient$.subscribe(p =>{
        this.patient=p;
        //console.log(p);
      });

      //console.log(this.bp);

  }

  getStatus(s:number,d:number){
    let r:string="Normal";
    if(s>159 || d>99)
      r="Hypertension Stage 2";
    else if(s>139 || d>89)
      r="Hypertension Stage 1"
    else if(s>120 || d>80)
      r="Pre Hypertension"
    else if(s>=89 || d>59)
      r="Normal"
    else
      r="Low"
      return r;
  }


  ngOnInit(): void {
    this.setNow();
    // this._masterVitals=this._dataService.getmasterVitals_onload();

    // this._dataService.masterVitals$.subscribe(
    //   vitals =>{
    //     this._masterVitals=vitals;
    //     console.log(this._masterVitals);
    //   }
    // );
  }

}
