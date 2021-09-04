import { Iprescription } from './../../interface/prescription';
import { Ireport_input, IFileList } from './../../interface/Ireport.interface';
import { IPatient } from './../../interface/Ipatient.interface';
import { ReportsService } from './../../services/reports.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ireport } from 'src/app/interface/Ireport.interface';
import { Guid } from "guid-typescript";
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  private patientID:string ="";
  patient: IPatient | undefined;
  reports : Ireport[] | undefined;
  prescriptionList: Iprescription[] | undefined;

  private pl:any | undefined;
  private pl1:any | undefined;
  private pl2:any | undefined;

   //d:Date = new Date();
  //report_date:string =   this.d.getFullYear() +"-"+ (this.d.getMonth()+1) +"-" + this.d.getDate();

  report_date: string  = "";

  report_input:Ireport_input={
    reprtName: null,
    imageName: [],
    description:null,
    date: null,
    Prescription_ID:null
  }

  f_list:IFileList[] =[];


  addfiles(e:any):void{
    console.log(e.target.files);
    
    for (let i = 0; i < e.target.files.length; i++) {
      let filname:string=Guid.create().toString() +"."+(e.target.files.item(i).name.substring(e.target.files.item(i).name.lastIndexOf('.')+1, e.target.files.item(i).name.length) || e.target.files.item(i).name);
      let fname:IFileList={
        "name":filname,
        file:e.target.files.item(i),
        imgURL:this.dom.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files.item(i)))
      };
      console.log(fname);
      this.f_list.push(fname);
    }

    e.target.value =null;
  }

  removeFile(i:any):void{
    this.f_list.splice(i, 1);
  }

  getDate(secs:number): Date{
    return new Date(secs * 1000);
  }

  addreports():void{
    if(this.report_input.reprtName =="" || this.report_input.reprtName ==null
      || this.report_input.Prescription_ID =="" || this.report_input.Prescription_ID ==null
      || this.report_input.description =="" || this.report_input.description ==null
      || this.report_date ==""
      || this.f_list.length==0
    )
    {
      Swal.fire({  
        icon: 'success',  
        title: 'Please complete the form',  
        showConfirmButton: true,
        toast:false,
        position:"center"
      }); 
    }
  else {
      this.report_input.date = new Date(this.report_date);
      let x=0,l=this.f_list.length;
      this.report_input.imageName=[];
      
      for(;x<l;x++){
        this.report_input.imageName.push(this.f_list[x].name)
      }
      this.rs.addReport(this.report_input,this.f_list)
      console.log(this.report_input);
    }
  }

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

    this.report_date =year + "-" + month + "-" + day;
  }

  constructor(private  route:ActivatedRoute,private router: Router, private rs:ReportsService,private dom: DomSanitizer ){
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

    rs.setPatientID(this.patientID);


    this.pl =rs.patient$.subscribe(p =>{
      this.patient=p;
      console.log(p);
    });

    this.pl1 =rs.report$.subscribe(p =>{
      this.reports=p;
      console.log(p);
    });

    this.pl2 =rs.prescription$.subscribe(p =>{
      this.prescriptionList=p;
      console.log(p);
    });


  } 



  ngOnInit(): void {
    this.setNow();
  }

}
