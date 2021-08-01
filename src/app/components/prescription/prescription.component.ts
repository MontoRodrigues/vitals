import { IPatient } from './../../interface/Ipatient.interface';
import { Iprescription, Iprescription_input } from './../../interface/prescription';
import { PrescriptionService } from './../../services/prescription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  patientID:string ="";
  private pl:any | undefined;
  private psl:any | undefined;

  patient: IPatient | undefined;

  visitDate:Date | undefined
  nextVisitDate:Date | undefined

  prescriptionList: Iprescription[] | undefined;
  prescription:Iprescription_input ={
    DoctorName:null,
    VisitDate: null,
    nextVisit: null,
    imageName: null,
  }

  gotoAddMedicine(id:string):void{
    this.router.navigate(['/addmedicine', {pid:this.patientID,psid:id}]);
  }

  prescriptionFile:File | null= null;

  getDate(secs:number): Date{
    return new Date(secs * 1000);
  }
  getImageURL(imagename:string){
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/Prescription%2F"+ this.patientID +"%2F" + imagename + "?alt=media";
  }
  
  FileuploadChange(e: any){
    this.prescriptionFile = e.target.files.item(0);
  }

  addPrescription():void{
    
    console.log("start")
    if(this.prescription.DoctorName ==null || this.visitDate == null || this.nextVisitDate ==null){
      Swal.fire({  
        icon: 'error',  
        title: 'Please complete the form',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }
    if(this.prescriptionFile ==null)
    {
      Swal.fire({  
        icon: 'error',  
        title: 'Please select prescription file',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return; 
    }

    this.prescription.VisitDate = new Date(this.visitDate);
    this.prescription.nextVisit = new Date(this.nextVisitDate);
    this.ps.addPrescription(this.prescription,this.prescriptionFile);
    
    // console.log(this.prescriptionFile.name);
    // console.log(this.prescription)

  }
  
  constructor(private  route:ActivatedRoute,private router: Router, private ps:PrescriptionService )
  {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      ps.setPatientID(this.patientID);

      this.psl =ps.prescription$.subscribe(p =>{
        this.prescriptionList=p;
        //console.log(p);
      });

      this.pl =ps.patient$.subscribe(p =>{
        this.patient=p;
        //console.log(p);
      });
  }

  ngOnInit(): void {
  }

}
