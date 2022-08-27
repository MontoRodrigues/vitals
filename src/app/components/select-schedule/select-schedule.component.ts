import { ISchedule, Iprescription, IMedicine } from './../../interface/prescription';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectScheduleServiceService } from './../../services/select-schedule-service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-select-schedule',
  templateUrl: './select-schedule.component.html',
  styleUrls: ['./select-schedule.component.css']
})
export class SelectScheduleComponent implements OnInit {

  patientID:string ="";

  private sl:any |undefined;
  private psl:any | undefined;
  private pml:any | undefined;
  private dsl:any | undefined;

  scheduleList: ISchedule[] | undefined;
  prescriptionList: Iprescription[] | undefined;
  medicineList:IMedicine[] | undefined;
  dailyScheduleList:any={};
  SelectList:any | undefined;
  ds:any={ScheduleList:{}, medicinelist:{}};

  private processData(){
    if(this.scheduleList != undefined && this.prescriptionList != undefined && this.medicineList != undefined ){
      // process previous Daily Schedule 
      var x=0, l=0;
      this.ds={ScheduleList:{}, medicinelist:{}};
      if(Object.keys(this.dailyScheduleList).length>1){
        x=0, l=this.dailyScheduleList.ScheduleList.length;
        for(;x<l;x++){
          this.ds.ScheduleList[this.dailyScheduleList.ScheduleList[x].docID]=this.dailyScheduleList.ScheduleList[x].docID;
        }
        x=0, l=this.dailyScheduleList.medicinelist.length;
        for(;x<l;x++){
          this.ds.medicinelist[this.dailyScheduleList.medicinelist[x].docID]=this.dailyScheduleList.medicinelist[x].docID;
        }
      }

      //console.log(this.ds);
      
      let sdl :any ={ScheduleList:[], medicinelist:[]};
      // create schedule list
         x=0, l=this.scheduleList.length;
        for(;x<l;x++){
          let s:any={
            name:this.scheduleList[x].Name,
            Instruction:this.scheduleList[x].Instruction,
            Schedule:this.scheduleList[x].Schedule,
            docID:this.scheduleList[x].docID,
            refremce:this.scheduleList[x].refremce,
            selected:false
            }
            if(this.ds.ScheduleList.hasOwnProperty(this.scheduleList[x].docID))
              s.selected =true;
          sdl.ScheduleList.push(s);
        }
        // sort schedule list
        sdl.ScheduleList=sdl.ScheduleList.sort(function(a:any,b:any){
          return parseInt(a.Schedule.Time1) - parseInt(b.Schedule.Time1);
        })

        var pl:any={};
        x=0, l=this.prescriptionList.length;

        // create Medicine list of precescriptions as an obejct 
        for(;x<l;x++){
          pl[this.prescriptionList[x].docID]=this.prescriptionList[x];
          pl[this.prescriptionList[x].docID].medicine=[];
          pl[this.prescriptionList[x].docID].selected=false;
        }

        //add medicines to prescription
        x=0, l=this.medicineList.length;
        for(;x<l;x++){
          let m:any=this.medicineList[x];
          m.selected=false;
          if(this.ds.medicinelist.hasOwnProperty(this.medicineList[x].docID))
            m.selected=true;
          pl[this.medicineList[x].prescriptionID].medicine.push(m);
        }

        // convert presctiption to an array
        for(let k in pl){
          sdl.medicinelist.push(pl[k]);
        }

        // sort prescriptions list 
        sdl.medicinelist=sdl.medicinelist.sort(function(a:any,b:any){
          return a.VisitDate.seconds - b.VisitDate.seconds;
        })

        //assign schedule and madicine list to Select List
        this.SelectList =sdl;
        //console.log(this.SelectList);
      
    }
  }

  public updateSchedule(){
    let x=0, l=this.SelectList.ScheduleList.length,i=0;

    var sdl :any ={ScheduleList:[], medicinelist:[]};

    let chk=false;
    // validate schedule
    for(;x<l;x++){
      if(this.SelectList.ScheduleList[x].selected){
        sdl.ScheduleList.push(this.SelectList.ScheduleList[x]);
        chk=true;
      }
    }
    if(!chk){
      Swal.fire({  
        icon: 'error',  
        title: 'Please select atleast 1 schedule',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }

    //validate Meicine
    chk=false;
    x=0, l=this.SelectList.medicinelist.length,i=0;
    for(;x<l;x++){
      for(i=0;i<this.SelectList.medicinelist[x].medicine.length;i++){
        if(this.SelectList.medicinelist[x].medicine[i].selected){
          // let m:any={
          //   EndDate:this.SelectList.medicinelist[x].medicine[i].EndDate,
          //   MedicineDetail:this.SelectList.medicinelist[x].medicine[i].MedicineDetail,
          //   MedicineName:this.SelectList.medicinelist[x].medicine[i].MedicineName,
          //   Schedule:this.SelectList.medicinelist[x].medicine[i].Schedule,
          //   StartDate:this.SelectList.medicinelist[x].medicine[i].StartDate,
          //   docID:this.SelectList.medicinelist[x].medicine[i].docID,
          //   instructions:this.SelectList.medicinelist[x].medicine[i].instructions,
          //   prescriptionID:this.SelectList.medicinelist[x].medicine[i].prescriptionID,

          //   DoctorName:this.SelectList.medicinelist[x].DoctorName,
          //   VisitDate:this.SelectList.medicinelist[x].VisitDate,
          //   imageName:this.SelectList.medicinelist[x].imageName
          // };

          let m:any=this.SelectList.medicinelist[x].medicine[i];
          m["DoctorName"]=this.SelectList.medicinelist[x].DoctorName;
          m["VisitDate"]=this.SelectList.medicinelist[x].VisitDate;
          m["imageName"]=this.SelectList.medicinelist[x].imageName;

          sdl.medicinelist.push(m);
          chk=true;
        }
      }
    }

    if(!chk){
      Swal.fire({  
        icon: 'error',  
        title: 'Please select atleast 1 medicine',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
      return;
    }

    this.ss.updateDailySchedule(sdl);
    Swal.fire({  
      icon: 'success',  
      title: 'Schudel added scucessfully',  
      showConfirmButton: true,
      toast:false,
      position:"center"
    }); 

    //console.log(sdl);
  }

  public SelectAllSchedule(e:any){
    let x=0, l=this.SelectList.ScheduleList.length;
    for(;x<l;x++){
      this.SelectList.ScheduleList[x].selected= e.target.checked;
    }
  }

  public SelectAllPrescription(p:any){
    p.selected = !p.selected;
    for(var x=0,l=p.medicine.length; x<l;x++){
      p.medicine[x].selected =p.selected;
    }
  }


  getDate(secs:number): Date{
    return new Date(secs * 1000);
  }

  constructor(private  route:ActivatedRoute,private router: Router, private ss:SelectScheduleServiceService) { 
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      ss.setPatientID(this.patientID);

      this.sl =ss.scheduleList$.subscribe(p =>{
        this.scheduleList=p;
        this.processData();
      });

      this.psl =ss.prescription$.subscribe(p =>{
        this.prescriptionList=p;
        this.processData();
      });

      this.pml =ss.medicineList$.subscribe(p =>{
        this.medicineList=p;
        this.processData();
      });

      this.dsl =ss.dailyScheduleList$.subscribe(p =>{
        this.dailyScheduleList=p;
        console.log(p);
        this.processData();
      });



  }

  public img_click(i:any){
    this.peview_image.img_url=this.getImageURL(i);
    this.peview_image.show=true;
  }

  getImageURL(imagename:string){
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/Prescription%2F"+ this.patientID +"%2F" + imagename + "?alt=media";
  }
  public peview_image:{show:boolean;img_url:string | null;}={show:false, img_url:null};



  public close_img_preview(){
    this.peview_image.show=false;
  }

  ngOnInit(): void {
  }

}
