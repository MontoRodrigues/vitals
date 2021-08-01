import { Iprescription, IMedicine, IMedicine_input } from './../../interface/prescription';
import { IPatient } from './../../interface/Ipatient.interface';
import { AddMedicineService } from './../../services/add-medicine.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {


  private patientID:string ="";
  private prescriptionID:string ="";

  patient: IPatient | undefined;
  prescription: Iprescription | undefined;
  medicineList:IMedicine[] | undefined;

  private pl:any | undefined;
  private psl:any | undefined;
  private pml:any | undefined;

  medicineInput:IMedicine_input ={
    MedicineName:null,
    MedicineDetail:null,
    instructions:null,
    StartDate: null,
    EndDate: null,
    prescriptionID: null,
    Schedule:{
        Time1:null,
        Time2:null,
        Time3:null,
        Time4:null,
        Time5:null,
    }
  };

  getDate(secs:number): Date{
    return new Date(secs * 1000);
  }

  deleteMedicine(docid:string):void{
    this.adm.deleteMedicine(docid);
  }

  addMedicine():void{
    if(this.medicineInput.MedicineName == null || this.medicineInput.MedicineDetail == null ||this.medicineInput.instructions == null){
      Swal.fire({  
        icon: 'error',  
        title: 'Please complete the form',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }

    if(this.medicineStartDate=="" || this.medicineEndDate==""){
      Swal.fire({  
        icon: 'error',  
        title: 'Please add Start & End Date',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }

    if(this.medicineInput.Schedule.Time1==null && this.medicineInput.Schedule.Time2==null && this.medicineInput.Schedule.Time3==null
       && this.medicineInput.Schedule.Time4==null && this.medicineInput.Schedule.Time5==null){
      Swal.fire({  
        icon: 'error',  
        title: 'Please mention atlest one time',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }


    this.medicineInput.StartDate = new Date(this.medicineStartDate);
    this.medicineInput.EndDate= new Date(this.medicineEndDate);
    this.medicineInput.prescriptionID = this.prescriptionID;

    this.adm.addMedicine(this.medicineInput);

    this.medicineInput ={
      MedicineName:null,
      MedicineDetail:null,
      instructions:null,
      StartDate: null,
      EndDate: null,
      prescriptionID: null,
      Schedule:{
          Time1:null,
          Time2:null,
          Time3:null,
          Time4:null,
          Time5:null,
      }
    };

  }

  medicineStartDate:string ="";
  medicineEndDate:string ="";

  constructor(private  route:ActivatedRoute,private router: Router, private adm:AddMedicineService )
  {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

    this.prescriptionID = this.route.snapshot.paramMap.get('psid') || "";
    if(this.prescriptionID=="")
      this.router.navigate(['/home']);

      adm.setPrescriptionID(this.patientID,this.prescriptionID);


      this.pl =adm.patient$.subscribe(p =>{
        this.patient=p;
        console.log(p);
      });

      this.psl =adm.prescription$.subscribe(p =>{
        this.prescription=p;
        console.log(p);
      });

      this.pml =adm.medicineList$.subscribe(p =>{
        this.medicineList=p;
        console.log(p);
      });
  }


  ngOnInit(): void {
  }

}
