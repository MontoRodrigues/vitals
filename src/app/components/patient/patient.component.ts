//import { BloodperssureChartComponent } from './../shared/bloodperssure-chart/bloodperssure-chart.component';
import { ISugar, IBloodPressure, IOxygen, ITemperature } from './../../interface/Ivital.interface';
import { IPatient } from './../../interface/Ipatient.interface';
import { PatientService } from './../../services/patient.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
//import Swal from 'sweetalert2'; 
//import {SugarChartComponent} from "../shared/sugar-chart/sugar-chart.component";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
 
  patientID:string ="";
  
  private pl:any |undefined;
  private plSugar:any | undefined;
  private plbloodPressure:any | undefined;
  private ploxygen:any | undefined;
  private pltemperature:any | undefined;

  //patient: IPatient | undefined;
  sugarLevels:ISugar[]| undefined;
  bloodPressure:IBloodPressure[] | undefined;
  oxygen :IOxygen[] | undefined;
  temperature:ITemperature[] | undefined;

 
  getDOB(secs:number): number {
    var t = new Date(Date.now() - (secs * 1000));
    return (Math.abs(t.getUTCFullYear() - 1970));
  }

  constructor(private  route:ActivatedRoute,private router: Router, private ps:PatientService )
  {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      ps.setPatientID(this.patientID);

      // this.pl =ps.patient$.subscribe(p =>{
      //   this.patient=p;
      //   //console.log(p);
      // });

      this.plSugar =ps.sugarLevels$.subscribe(p =>{
        this.sugarLevels=p;
        //console.log(p);
      });

      this.plbloodPressure =ps.bloodPressure$.subscribe(p =>{
        this.bloodPressure=p;
        //console.log(p);
      });

      this.ploxygen =ps.oxygen$.subscribe(p =>{
        this.oxygen=p;
        //console.log(p);
      });

      this.pltemperature =ps.temperature$.subscribe(p =>{
        this.temperature=p;
        //console.log(p);
      });
      
  }

  ngOnInit(): void {
    //this.ps.getPatientInfo();
  }

}
