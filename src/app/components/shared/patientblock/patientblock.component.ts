import { IPatient } from './../../../interface/Ipatient.interface';
import { Component, OnInit,Input } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-patientblock',
  templateUrl: './patientblock.component.html',
  styleUrls: ['./patientblock.component.css']
})
export class PatientblockComponent implements OnInit {
  @Input("patient")  patient!: IPatient;

  
  constructor() { 
   console.log( this.patient)
  }

  ngOnInit(): void {
    
  }

}
