import { IPatient } from './../../interface/Ipatient.interface';
import { element } from 'protractor';
import { IBloodPressure_input, IOxygen_input, ISugar_input, ITemperature_input, Ivitals_error, IWeight_input } from './../../interface/Ivital.interface';
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

  

  // patient: IPatient | undefined; 
  // private pl:any |undefined;
  patientID:string ="";
  age:any =0;


  weight:IWeight_input ={
    weight:0,
    date: null,
    status:""
  };

 weight_error:Ivitals_error={
    error:"No error",
    show:false
  }

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
    date:  null,
    status:""
  }

  ox_error:Ivitals_error={
    error:"No error",
    show:false
  }

  sg:ISugar_input ={
    sugarLevel:0,
    date: null,
    status:"",
    type:"Fasting"
  }

  sg_error:Ivitals_error={
    error:"No error",
    show:false
  }

  tmp:ITemperature_input ={
    temp:0,
    date: null,
    status:""
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

 
//---- BP functions
  validateBP():boolean{
    if(this.bp.systolic>0 && this.bp.diastolic>0 ){
      //console.log(this.bp);
      if (this.bp.systolic<=80)
      {
        this.bp_error.error ="Your systolic value(top number) is too Low for our calculator to give an accurate diagnosis.";
        this.bp_error.show=true;
        return false;
      }
      if (this.bp.diastolic<=50)
      {
        this.bp_error.error="Your diastolic value(bottom number) is too Low for our calculator to give an accurate diagnosis.";
        this.bp_error.show=true;
        return false;
      }


      if (this.bp.systolic>250)
      {
        this.bp_error.error="Please enter correct systolic value";;
        this.bp_error.show=true;
        return false;
      }
      if (this.bp.diastolic>140)
      {
        this.bp_error.error="Please enter correct diastolic value";;
        this.bp_error.show=true;
        return false;
      }
      
      
      if (this.bp.diastolic>this.bp.systolic)
      {
        this.bp_error.error="Please enter correct values, systolic BP in 1st box and Diastolic BP in 2nd box";
        this.bp_error.show=true;
        return false;
      }


      if ((this.bp.systolic-this.bp.diastolic)<15)
      {
        this.bp_error.error="Please enter correct values";
        this.bp_error.show=true;
        return false;
      }

      return true;
    }
    else
      return  false;
  }

  getBPLevels(){
    console.log(this.validateBP());
    if(this.validateBP()){
        this.bp.Status=this.getStatus(this.bp.systolic,this.bp.diastolic);
    }
    else{
      this.bp.Status="";
    }
  }
 
  getStatus(s:number,d:number):string{
    let r:string="normal";
    let rn=2;

    if(s<90){
      r="low";
      rn=1;
    }
    else if(s<121){
      r="normal";
      rn=2;
    }
    else if(s<141){
      r="elevated";
      rn=3;
    }
    else{
      r="high";
      rn=4;
    }
   


    let ds:string ="normal";
    let dn=2;
    if(d<61){
      ds="low"
      dn=1;
    }
    else if(d<81){
      ds="normal";
      dn=2;
    }
    else if(d<91) {
      ds="elevated";
      dn=3;
    }
    else{
      ds="high";
      dn=4;
    }

    console.log([r,ds]);
    if(rn>dn)
      return r;
    else 
      return ds;
  } 

//-----BP functions end ----

//---------- Oxygen
getOxStatus(){

  console.log(this.ox)
  if(this.ox.SpO2<100){
    if(this.ox.SpO2>0){
      if(this.ox.SpO2>95)
        this.ox.status="normal";
      else if(this.ox.SpO2>90)
        this.ox.status="concerning";
      else if(this.ox.SpO2>85)
        this.ox.status="low";
      else if(this.ox.SpO2>66)
        this.ox.status="danger";
      else
        this.ox.status="cyanosis";
    }
  }
  else{
    this.ox_error.error="Oxygen Leve cannot be greater than 100%";
    this.ox_error.show=true;
    this.ox.status="";
  }

};
//----- End Oxygen

//----sugar 
getSgStatus(){
  console.log(this.sg);
  if(this.sg.sugarLevel >0 && this.sg.type!=""){
    if(this.sg.type=="Fasting" || this.sg.type=="Pre-Meal" || this.sg.type=="Before Sleap"){
      if(this.sg.sugarLevel <101)
        this.sg.status ="normal";
      else if(this.sg.sugarLevel <126)
        this.sg.status ="borderline";
      else
        this.sg.status ="high";
    }
    else {
      if(this.sg.sugarLevel <191)
        this.sg.status ="normal";
      else if(this.sg.sugarLevel <220)
        this.sg.status ="borderline";
      else
        this.sg.status ="high";
    }
  }
  else
    this.sg.status ="";
};
//-- end sugar

//---temp
  getTempStatus(){
    if(this.tmp.temp >0 ){
      if(this.tmp.temp<95)
        this.tmp.status ="hypothermia";
      else if(this.tmp.temp<99.6)
        this.tmp.status ="normal";
      else if(this.tmp.temp<101)
        this.tmp.status ="low";
      else
        this.tmp.status ="high";
    }
    else
      this.tmp.status ="";
  };
//----

  addVitals(){

    let r:string ="";
    this.bp.date = new Date(this.bp_date);
    this.ox.date = new Date(this.bp_date);
    this.sg.date = new Date(this.bp_date);
    this.tmp.date = new Date(this.bp_date);
    this.weight.date= new Date(this.bp_date);


    //---------weight-----
    if (this.weight.weight>0 ){
      this.vs.add_weight(this.weight,this.patientID);
      this.weight ={
        weight:0,
        date: null,
        status:""
      };
      r+="Weight, "
    }
    else{
      this.weight_error.error="Please fill the values for Weight";
      this.weight_error.show=true;
    }
    //-------------------


    //---------Blood Pressure-----
    if (this.bp.systolic>0 && this.bp.diastolic>0 && this.bp.pulse>0){
      if(this.bp.diastolic<this.bp.systolic){
        //this.bp.Status =this.getStatus(this.bp.systolic,this.bp.diastolic);
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
          date:  null,
          status:""
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
          date: null,
          status:"",
          type:"Fasting"
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
        date: null,
        status:""
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

  getDate(secs:number): Date{
    return new Date(secs * 1000);
  }

  constructor(private  route:ActivatedRoute,private router: Router, private vs:VitalsService )
  {

   
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    let a = this.route.snapshot.paramMap.get('a') || "";

    if(!isNaN(parseInt(a)))
      this.age =Math.floor((new Date().getTime() - new Date(this.getDate(parseInt(a))).getTime()) / 3.15576e+10)

      console.log(this.age);
    if(this.patientID=="")
      this.router.navigate(['/home']);

      vs.setPatientId(this.patientID);

      // this.pl =vs.patient$.subscribe(p =>{
      //   this.patient=p;
      //   //console.log(p);
      // });

      //console.log(this.bp);

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
