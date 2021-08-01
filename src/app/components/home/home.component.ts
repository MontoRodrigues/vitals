import { IPatientUserMap, IPatient_input } from './../../interface/Ipatient.interface';
import { Router } from '@angular/router';
import { HomeService } from './../../services/home.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


   patientlist:IPatientUserMap[] | undefined;
   private pl:any |undefined;
  constructor(private _home: HomeService,private router: Router) { 
  
  
    this.pl =_home.patientlist$.subscribe(p =>{
      this.patientlist=p;
      console.log(p);
    });

    _home.getPatientList();
  }

  new_pation:IPatient_input ={
    FirstName: "",
    LastName: "",
    Gender: null,
    Mobile:"",
    Address:"",
    DateOfBirth: null
  }

  showModel:boolean =false;

  toggleModel(){
    if(this.showModel)
      this.showModel=false;
    else
      this.showModel=true;
  }


  checkalert(){
    Swal.fire({  
      position: 'top-end',  
      icon: 'success',  
      title: 'Patient Added Scucessfully',  
      showConfirmButton: false,
      toast:true,
      timer:5000
    }); 
  }
  addPatient(){
    
    if(this.new_pation.FirstName !=="" && this.new_pation.LastName!=="" && this.new_pation.Gender !==null && this.new_pation.Mobile !=="" && this.new_pation.Address !=="" && this.new_pation.DateOfBirth !==null) 
    { 
      this._home.addPatient(this.new_pation);
      this.showModel=false;
      Swal.fire({  
        position: 'top-end',  
        icon: 'success',  
        title: 'Patient Added Scucessfully',  
        showConfirmButton: false,
        toast:true,
        timer:5000
      }); 
    } 
    else
      alert("please complete the form");
  }

  gotoPatient(patientID:string){
    //this.router.navigate(['/vitals', {pid:patientID}]);
    this.router.navigate(['/patient', {pid:patientID}]);
  }
  ngOnInit(): void {

  }


  ngOnDestroy() {
    this.pl.unsubscribe()
  }

}
