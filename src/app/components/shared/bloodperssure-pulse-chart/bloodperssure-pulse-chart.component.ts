import { ISugar, IBloodPressure } from './../../../interface/Ivital.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-bloodperssure-pulse-chart',
  templateUrl: './bloodperssure-pulse-chart.component.html',
  styleUrls: ['./bloodperssure-pulse-chart.component.css']
})
export class BloodperssurePulseChartComponent implements OnInit {

  @Input() bpPulseList : IBloodPressure[] |undefined;
  newChart:any | null;
  createChart(data:any,lable:any):void{
    //console.log(this.sugarLevelsList);
    if(this.newChart==null) {
      this.newChart = new Chart("bpPulsechart", {
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
      this.newChart.data.datasets=data;
      this.newChart.update();
    }
  }

  constructor() { }

  ngOnChanges(){

    //console.log(this.sugarLevelsList);
    if(this.bpPulseList !=null){
      //create new data
      let data:any=[{
        label: 'BP Pulse',
        data: [],
        borderWidth: 1,
        borderColor:"#ae2012"
      }];
      let label:any=[];

      this.bpPulseList.sort(function(a,b){
        return a.date.seconds - b.date.seconds;
      });


      for(let x=0,l=this.bpPulseList.length;x<l;x++){
        let d=new Date(this.bpPulseList[x].date.seconds * 1000);
        //console.log([d,this.sugarLevelsList[x].date.seconds]);
        label.push(d.getDate() +"-" + (d.getMonth()+1) + "-" + d.getFullYear().toString().substr(2) +" "+d.getHours() +":" + d.getMinutes());
        data[0].data.push(this.bpPulseList[x].pulse);
      }


      this.createChart(data,label);
    }
  }

  ngOnInit(): void {
  
    
  }

}
