import { IOxygen } from './../../../interface/Ivital.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-spo2chart',
  templateUrl: './spo2chart.component.html',
  styleUrls: ['./spo2chart.component.css']
})
export class Spo2chartComponent implements OnInit {

  @Input() spo2List : IOxygen[] |undefined;
  newChart1:any | null;
  createChart(data:any,lable:any):void{
    //console.log(this.sugarLevelsList);
    if(this.newChart1==null) {
      this.newChart1 = new Chart("spo2chart", {
        type: 'line',
        data: {
            labels: lable,
            datasets: data
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
              legend: {
                display: false
              }
            },
            maintainAspectRatio:true,
            responsive:true
        }
      });
    }
    else{
      this.newChart1.data.datasets=data;
      this.newChart1.update();
    }
  }

  constructor() { }

  ngOnChanges(){

    //console.log(this.sugarLevelsList);
    if(this.spo2List !=null){
      //create new data
      let data:any=[{
        label: 'Sugar Levels',
        data: [],
        borderWidth: 1,
        borderColor:"#ae2012"
      }];
      let label:any=[];

      this.spo2List.sort(function(a,b){
        return a.date.seconds - b.date.seconds;
      });


      for(let x=0,l=this.spo2List.length;x<l;x++){
        let d=new Date(this.spo2List[x].date.seconds * 1000);
        //console.log([d,this.sugarLevelsList[x].date.seconds]);
        label.push(d.getDate() +"-" + (d.getMonth()+1) + "-" + d.getFullYear().toString().substr(2) +" "+d.getHours() +":" + d.getMinutes());
        data[0].data.push(this.spo2List[x].SpO2);
      }
      this.createChart(data,label);
    }
  }
  ngOnInit(): void {
  }


}
