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

  //patient: IPatient | undefined;
  prescription: Iprescription | undefined;
  medicineList:IMedicine[] | undefined;

  private pl:any | undefined;
  private psl:any | undefined;
  private pml:any | undefined;

  public time ={time1: {selected:true,t: [
    {value:"MO",selected:true},
    {value:"TU",selected:true},
    {value:"WE",selected:true},
    {value:"TH",selected:true},
    {value:"FR",selected:true},
    {value:"SA",selected:true},
    {value:"SU",selected:true}
  ]},

  time2:{selected:true,t:[
    {value:"MO",selected:true},
    {value:"TU",selected:true},
    {value:"WE",selected:true},
    {value:"TH",selected:true},
    {value:"FR",selected:true},
    {value:"SA",selected:true},
    {value:"SU",selected:true}
  ]},

  time3:{selected:true,t:[
    {value:"MO",selected:true},
    {value:"TU",selected:true},
    {value:"WE",selected:true},
    {value:"TH",selected:true},
    {value:"FR",selected:true},
    {value:"SA",selected:true},
    {value:"SU",selected:true}
  ]},

  time4:{selected:true,t:[
    {value:"MO",selected:true},
    {value:"TU",selected:true},
    {value:"WE",selected:true},
    {value:"TH",selected:true},
    {value:"FR",selected:true},
    {value:"SA",selected:true},
    {value:"SU",selected:true}
  ]},

  time5:{selected:true,t:[
    {value:"MO",selected:true},
    {value:"TU",selected:true},
    {value:"WE",selected:true},
    {value:"TH",selected:true},
    {value:"FR",selected:true},
    {value:"SA",selected:true},
    {value:"SU",selected:true}
  ]}};

  public selectChild(wd:any){
    wd.selected = !wd.selected;
    //console.log(wd);
    for(var x=0; x< wd.t.length; x++){
      wd.t[x].selected = wd.selected;
    }
  }

  medicineInput:IMedicine_input ={
    MedicineName:"test 1",
    MedicineDetail:"test 1",
    instructions:"test 1",
    StartDate: null,
    EndDate: null,
    prescriptionID: null,
    Schedule:{
        Time1:null,
        Time2:null,
        Time3:null,
        Time4:null,
        Time5:null
    },
    weekDay:{
        Time1:"",
        Time2:"",
        Time3:"",
        Time4:"",
        Time5:""
    }
  };

  getDate(secs:number): Date{
    return new Date(secs * 1000);
  }

  deleteMedicine(docid:string):void{
    this.adm.deleteMedicine(docid);
  }

  validateWeekday(t:any, t1:any){
    let x=0;
    let t_count =0;
    let r= false;
  };

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

   //------chek if weekday is selected for time.
  let x=0;

   // time 1
   if(this.medicineInput.Schedule.Time1 !=null){
    this.medicineInput.weekDay.Time1="";
    for(;x<this.time.time1.t.length;x++){
      if(this.time.time1.t[x].selected){
        this.medicineInput.weekDay.Time1+=this.time.time1.t[x].value +",";
      }
    }
    if(this.medicineInput.weekDay.Time1.length>0)
      this.medicineInput.weekDay.Time1=this.medicineInput.weekDay.Time1.substring(0,this.medicineInput.weekDay.Time1.length-1)
      
      //console.log(this.medicineInput.weekDay.Time1);
    if(this.medicineInput.weekDay.Time1.length==0){
      //console.log("time1");
      Swal.fire({  
        icon: 'error',  
        title: 'Please select Weekday for Time1',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }
   }


// time 2

   if(this.medicineInput.Schedule.Time2 !=null){
     x=0;
    this.medicineInput.weekDay.Time2="";
    for(;x<this.time.time2.t.length;x++){
      if(this.time.time2.t[x].selected){
        this.medicineInput.weekDay.Time2+=this.time.time2.t[x].value +",";
      }
    }
    if(this.medicineInput.weekDay.Time2.length>0)
      this.medicineInput.weekDay.Time2=this.medicineInput.weekDay.Time2.substring(0,this.medicineInput.weekDay.Time2.length-1)
      
      //console.log(this.medicineInput.weekDay.Time2);
    if(this.medicineInput.weekDay.Time2.length==0){
      //console.log("time2");
      Swal.fire({  
        icon: 'error',  
        title: 'Please select Weekday for Time2',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }
   }

// time 3

if(this.medicineInput.Schedule.Time3 !=null){
  x=0;
 this.medicineInput.weekDay.Time3="";
 for(;x<this.time.time3.t.length;x++){
   if(this.time.time3.t[x].selected){
     this.medicineInput.weekDay.Time3+=this.time.time3.t[x].value +",";
   }
 }
 if(this.medicineInput.weekDay.Time3.length>0)
    this.medicineInput.weekDay.Time3=this.medicineInput.weekDay.Time3.substring(0,this.medicineInput.weekDay.Time3.length-1)
   
   //console.log(this.medicineInput.weekDay.Time3);
 if(this.medicineInput.weekDay.Time3.length==0){
   //console.log("time3");
   Swal.fire({  
     icon: 'error',  
     title: 'Please select Weekday for Time3',  
     showConfirmButton: true,
     toast:false,
     position:"center"
   }); 
   return;
 }
}


// time 4

if(this.medicineInput.Schedule.Time4 !=null){
  x=0;
 this.medicineInput.weekDay.Time4="";
 for(;x<this.time.time4.t.length;x++){
   if(this.time.time4.t[x].selected){
     this.medicineInput.weekDay.Time4+=this.time.time4.t[x].value +",";
   }
 }
 if(this.medicineInput.weekDay.Time4.length>0)
 this.medicineInput.weekDay.Time4=this.medicineInput.weekDay.Time4.substring(0,this.medicineInput.weekDay.Time4.length-1)
   
   //console.log(this.medicineInput.weekDay.Time4);
 if(this.medicineInput.weekDay.Time4.length==0){
   //console.log("time4");
   Swal.fire({  
     icon: 'error',  
     title: 'Please select Weekday for Time4',  
     showConfirmButton: true,
     toast:false,
     position:"center"
   }); 
   return;
 }
}

// time 5

if(this.medicineInput.Schedule.Time5 !=null){
  x=0;
 this.medicineInput.weekDay.Time5="";
 for(;x<this.time.time5.t.length;x++){
   if(this.time.time5.t[x].selected){
     this.medicineInput.weekDay.Time5+=this.time.time5.t[x].value +",";
   }
 }
 if(this.medicineInput.weekDay.Time5.length>0)
  this.medicineInput.weekDay.Time5=this.medicineInput.weekDay.Time5.substring(0,this.medicineInput.weekDay.Time5.length-1)
   
   //console.log(this.medicineInput.weekDay.Time5);
 if(this.medicineInput.weekDay.Time5.length==0){
   //console.log("time5");
   Swal.fire({  
     icon: 'error',  
     title: 'Please select Weekday for Time5',  
     showConfirmButton: true,
     toast:false,
     position:"center"
   }); 
   return;
 }
}



 //add time1
 


    this.medicineInput.StartDate = new Date(this.medicineStartDate);
    this.medicineInput.EndDate= new Date(this.medicineEndDate);
    this.medicineInput.prescriptionID = this.prescriptionID;

    this.adm.addMedicine(this.medicineInput);

    Swal.fire({  
      icon: 'success',  
      title: 'Record added scucessfully',  
      showConfirmButton: true,
      toast:false,
      position:"center"
    }); 

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
      },
      weekDay:{
        Time1:"",
        Time2:"",
        Time3:"",
        Time4:"",
        Time5:""
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


      // this.pl =adm.patient$.subscribe(p =>{
      //   this.patient=p;
      //   ////console.log(p);
      // });

      this.psl =adm.prescription$.subscribe(p =>{
        this.prescription=p;
        //console.log(p);
      });

      this.pml =adm.medicineList$.subscribe(p =>{
        this.medicineList=p;
        //console.log(p);
      });
  }


  ngOnInit(): void {
  }

}
