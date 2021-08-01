import { IBloodPressure } from './../../../interface/Ivital.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-bloodperssure-chart',
  templateUrl: './bloodperssure-chart.component.html',
  styleUrls: ['./bloodperssure-chart.component.css']
})
export class BloodperssureChartComponent implements OnInit {

  @Input() bpList : IBloodPressure[] |undefined;
  newChart:any | null;

  createChart(data:any,lable:any):void{
    //console.log(this.sugarLevelsList);
    if(this.newChart==null) {
      this.newChart = new Chart("bpchart", {
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
                display: true
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

  ngOnChanges(){

    //console.log(this.sugarLevelsList);
    if(this.bpList !=null){
      //create new data
      let data:any=[
        {
        label: 'Systolic',
        data: [],
        borderWidth: 1,
        borderColor:"#2a9d8f",
        backgroundColor:"#2a9d8f"
        },
        {
        label: 'Diastolic',
        data: [],
        borderWidth: 1,
        borderColor:"#ae2012",
        backgroundColor:"#ae2012"
        }
    ];
      let label:any=[];

      this.bpList.sort(function(a,b){
        return a.date.seconds - b.date.seconds;
      });


      for(let x=0,l=this.bpList.length;x<l;x++){
        let d=new Date(this.bpList[x].date.seconds * 1000);
        //console.log([d,this.sugarLevelsList[x].date.seconds]);
        label.push(d.getDate() +"-" + (d.getMonth()+1) + "-" + d.getFullYear().toString().substr(2) +" "+d.getHours() +":" + d.getMinutes());
        data[0].data.push(this.bpList[x].systolic);
        data[1].data.push(this.bpList[x].diastolic);
        //data[2].data.push(this.bpList[x].pulse);
      }


      this.createChart(data,label);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
