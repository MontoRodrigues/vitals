import { Spo2PulsechartComponent } from './../shared/spo2-pulsechart/spo2-pulsechart.component';
import { DailyScheduleService } from './../../services/daily-schedule.service';
import { IMedicine, ISchedule, IdailySchedule, IscheduleStatus, IscheduleStatusArray, IscheduleStatus_input } from './../../interface/prescription';
import { IPatient } from './../../interface/Ipatient.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'; 

export interface scheduleStatus{
  docID:string;
  status:boolean;
}

export interface scheduleStatusList{
  date:Date;
  statusList:scheduleStatus[];
}

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})

export class DailyScheduleComponent implements OnInit {

  patientID:string ="";
  patient: IPatient | undefined;
  medicineList:IMedicine[] | undefined;
  scheduleList: ISchedule[] | undefined;

  statusList:scheduleStatusList[] |undefined;
  statusactionlist:IscheduleStatus | undefined;
  statusListAction:any ={};
  dailySchedule:IdailySchedule[] =[];
  private pl:any | undefined;
  private pml:any | undefined;
  private sl:any |undefined;
  private ssl:any | undefined;

  dateID():string{
    let d= new Date();
    return d.getFullYear()+"_"+(d.getMonth()+1)+"_" + d.getDate();
  }

  getScheduleStatus():void{
    this.statusListAction={};
    if(this.statusactionlist !=undefined && this.statusactionlist.hasOwnProperty("status")){
      for(let x=0,l=this.statusactionlist.status.length;x<l;x++){
        this.statusListAction[this.statusactionlist.status[x].docID] =this.statusactionlist.status[x].status;
      }
    }
    //console.log(this.statusListAction);
  }

  getScheduleStatusDocID(docID:string,date:Date):boolean{
    //console.log(docID + "_"+ date.getHours() +"_" + date.getMinutes());
    if(this.statusListAction==null)
      return false;
    else{
      //console.log([docID,this.statusListAction[docID]]);
      if(this.statusListAction[docID + "_"+ date.getHours() +"_" + date.getMinutes() ] != undefined)
        return this.statusListAction[docID + "_"+ date.getHours() +"_" + date.getMinutes()];
      else
        return false;
    }
  }

  // setDefaultScheduleStatus():void{
  //   if(this.statusListAction==null){
  //     let j:any ={};
  //     for(let x=0,l=this.dailySchedule.length;x<l;x++){
  //       this.statusListAction[this.dailySchedule[x].docID] =false;
  //     }
  //   }
  //   else{
  //     let j:any={};
  //     for(let x=0,l=this.dailySchedule.length;x<l;x++){
  //       if(this.statusListAction[this.dailySchedule[x].docID]==undefined)
  //         this.statusListAction[this.dailySchedule[x].docID] =false;
  //         j[this.dailySchedule[x].docID]=false;
  //     }
  //     for(let k in this.statusListAction){
  //       if(j[k]==undefined)
  //       delete(this.statusListAction[k]);
  //     }
  //   }

  //   for( let k of Object. keys(localStorage)){
  //     if(isNaN(Date.parse(k.split('_').join('-')))==false)
  //       localStorage.removeItem(k);
  //   }
  //   localStorage.setItem(this.dateID(), JSON.stringify(this.statusListAction));
  // }
  
  createData():void{
    if(this.medicineList !=undefined && this.scheduleList!=undefined && this.statusactionlist!=undefined){
     this.getScheduleStatus();

      let data:IdailySchedule[]=[];
      let x:number=0;
      let l:number = this.medicineList.length;
      
      let d= new Date();
      let dt:string =d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
      
      let details=[] as any;

      for(;x<l;x++){
        details=[]

        details.push(this.medicineList[x].MedicineDetail);

        if(this.medicineList[x].Schedule.Time1 !==null) {
          
          data.push({"name":this.medicineList[x].MedicineName, 
          docID:this.medicineList[x].docID,
          type:"Medicine",
          instructions:this.medicineList[x].instructions,
          status:this.getScheduleStatusDocID(this.medicineList[x].docID, new Date(dt + " " + this.medicineList[x].Schedule.Time1 )),
          date: new Date(dt + " " + this.medicineList[x].Schedule.Time1 ),
         // "instruction":this.medicineList[x].instructions,
          "details":details});
        }
        if(this.medicineList[x].Schedule.Time2 !==null) {
          data.push({"name":this.medicineList[x].MedicineName, 
          docID:this.medicineList[x].docID,
          instructions:this.medicineList[x].instructions,
          status:this.getScheduleStatusDocID(this.medicineList[x].docID, new Date(dt + " " + this.medicineList[x].Schedule.Time2 )),
          type:"Medicine",
          date: new Date(dt + " " + this.medicineList[x].Schedule.Time2 ),
          //"instruction":this.medicineList[x].instructions,
          "details":details});
        }
        if(this.medicineList[x].Schedule.Time3 !==null) {
          data.push({"name":this.medicineList[x].MedicineName, 
          docID:this.medicineList[x].docID,
          instructions:this.medicineList[x].instructions,
          status:this.getScheduleStatusDocID(this.medicineList[x].docID, new Date(dt + " " + this.medicineList[x].Schedule.Time3 )),
          type:"Medicine",
          date: new Date(dt + " " + this.medicineList[x].Schedule.Time3 ),
          //"instruction":this.medicineList[x].instructions,
          "details":details});
        }
        if(this.medicineList[x].Schedule.Time4 !==null) {
          data.push({"name":this.medicineList[x].MedicineName, 
          docID:this.medicineList[x].docID,
          instructions:this.medicineList[x].instructions,
          status:this.getScheduleStatusDocID(this.medicineList[x].docID, new Date(dt + " " + this.medicineList[x].Schedule.Time4 )),
          type:"Medicine",
          date: new Date(dt + " " + this.medicineList[x].Schedule.Time4 ),
         // "instruction":this.medicineList[x].instructions,
          "details":details});
        }
        if(this.medicineList[x].Schedule.Time5 !==null) {
          data.push({"name":this.medicineList[x].MedicineName, 
          docID:this.medicineList[x].docID,
          instructions:this.medicineList[x].instructions,
          status:this.getScheduleStatusDocID(this.medicineList[x].docID, new Date(dt + " " + this.medicineList[x].Schedule.Time5 )),
          "type":"Medicine",
          "date": new Date(dt + " " + this.medicineList[x].Schedule.Time5 ),
          //"instruction":this.medicineList[x].instructions,
          "details":details});
        }
      }

      x=0;
      l=this.scheduleList.length;
      for(;x<l;x++){
        details=[];
          
          if(this.scheduleList[x].refremce.uri1!=null)
            details.push(this.scheduleList[x].refremce.uri1);

          if(this.scheduleList[x].refremce.uri2!=null)
          details.push(this.scheduleList[x].refremce.uri2);  

          if(this.scheduleList[x].refremce.uri3!=null)
          details.push(this.scheduleList[x].refremce.uri3);  

          if(this.scheduleList[x].refremce.uri4!=null)
          details.push(this.scheduleList[x].refremce.uri4);  
          
          if(this.scheduleList[x].Schedule.Time1 !=null){
           
            data.push({
              "name": this.scheduleList[x].Name,
              docID:this.scheduleList[x].docID,
              instructions:this.scheduleList[x].Instruction,
              status:this.getScheduleStatusDocID(this.scheduleList[x].docID,new Date(dt + " " + this.scheduleList[x].Schedule.Time1 )),
              "type":"schedule",
              "date":new Date(dt + " " + this.scheduleList[x].Schedule.Time1 ),
             // "instruction": this.scheduleList[x].Instruction,
              "details":details
            });
          }

          if(this.scheduleList[x].Schedule.Time2 !=null){
            data.push({
              "name": this.scheduleList[x].Name,
              docID:this.scheduleList[x].docID,
              instructions:this.scheduleList[x].Instruction,
              status:this.getScheduleStatusDocID(this.scheduleList[x].docID,new Date(dt + " " + this.scheduleList[x].Schedule.Time2 )),
              "type":"schedule",
              "date":new Date(dt + " " + this.scheduleList[x].Schedule.Time2 ),
             // "instruction": this.scheduleList[x].Instruction,
              "details":details
            });
          }

          if(this.scheduleList[x].Schedule.Time3 !=null){
            data.push({
              "name": this.scheduleList[x].Name,
              docID:this.scheduleList[x].docID,
              instructions:this.scheduleList[x].Instruction,
              status:this.getScheduleStatusDocID(this.scheduleList[x].docID,new Date(dt + " " + this.scheduleList[x].Schedule.Time3 )),
              "type":"schedule",
              "date":new Date(dt + " " + this.scheduleList[x].Schedule.Time3 ),
             // "instruction": this.scheduleList[x].Instruction,
              "details":details
            });
          }

          if(this.scheduleList[x].Schedule.Time4 !=null){
            data.push({
              "name": this.scheduleList[x].Name,
              docID:this.scheduleList[x].docID,
              instructions:this.scheduleList[x].Instruction,
              status:this.getScheduleStatusDocID(this.scheduleList[x].docID,new Date(dt + " " + this.scheduleList[x].Schedule.Time4 )),
              "type":"schedule",
              "date":new Date(dt + " " + this.scheduleList[x].Schedule.Time4 ),
              //"instruction": this.scheduleList[x].Instruction,
              "details":details
            });
          }

          if(this.scheduleList[x].Schedule.Time5 !=null){
            data.push({
              "name": this.scheduleList[x].Name,
              docID:this.scheduleList[x].docID,
              instructions:this.scheduleList[x].Instruction,
              status:this.getScheduleStatusDocID(this.scheduleList[x].docID,new Date(dt + " " + this.scheduleList[x].Schedule.Time5 )),
              "type":"schedule",
              "date":new Date(dt + " " + this.scheduleList[x].Schedule.Time5 ),
              //"instruction": this.scheduleList[x].Instruction,
              "details":details
            });
          }
        
      }
      data.sort(function(a:any,b:any){
        return a.date - b.date;
      });

      this.dailySchedule =data;

      // if(this.statusListAction !=null)
      //   this.setDefaultScheduleStatus();

      //console.log(this.dailySchedule);
    }
  }

  getBackground(d:any):string{
    let nd = new Date();
    if(d.date.getHours()== nd.getHours())
      return "thishour";
    else{
      if(d.date.getHours()<nd.getHours() && d.status == false)
        return "missedSchedule";
      else
        return "";
    }
    
  }


  setStatus():void{
    let j:IscheduleStatus_input={
      date:this.dateID(),
      status:[]
    }

 //   let checkupdate:boolean=false;

    for(let x=0,l=this.dailySchedule.length;x<l;x++){

      let s:IscheduleStatusArray={
        docID:this.dailySchedule[x].docID + "_"+ this.dailySchedule[x].date.getHours() +"_" + this.dailySchedule[x].date.getMinutes(),
        status:this.dailySchedule[x].status
      }
      //console.log([s,this.dailySchedule[x].name]);
      j.status.push(s);
      
      // if(this.statusListAction.hasOwnProperty(this.dailySchedule[x].docID)){
      //   if(this.statusListAction[this.dailySchedule[x].docID]!=this.dailySchedule[x].status)
      //     checkupdate=true;
      // }
      // else
      //   checkupdate=true;
    }

    this.ds.updateScheduleStatus(j,this.dateID());
   
    Swal.fire({  
      icon: 'success',  
      title: 'Schedule Saved Scucessfully',  
      showConfirmButton: true,
      toast:false,
      position:"center"
    }); 
  }

  constructor(private  route:ActivatedRoute,private router: Router, private ds:DailyScheduleService )
  {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      ds.setPatientID(this.patientID);
      
      this.pl =ds.patient$.subscribe(p =>{
        this.patient=p;
        //console.log(p);
      });

      this.pml =ds.medicineList$.subscribe(p =>{
        this.medicineList=p;
        this.createData();
        //console.log(p);
      });

      this.sl =ds.scheduleList$.subscribe(p =>{
        this.scheduleList=p;
        this.createData();
        //console.log(p);
      });

      this.ssl =ds.scheduleStatus$.subscribe(p =>{
       
          this.statusactionlist=p;
        // else
        //   this.statusactionlistArray={date:this.dateID(),status:[],docID:null};
        
        // if(this.dailySchedule.length==0)
          this.createData();
        //console.log(p);
      });
  }

  ngOnInit(): void {
  }

}
