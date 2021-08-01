import { ITemperature } from './../../../interface/Ivital.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-temprature-chart',
  templateUrl: './temprature-chart.component.html',
  styleUrls: ['./temprature-chart.component.css']
})
export class TempratureChartComponent implements OnInit {

  @Input() temprature : ITemperature[] |undefined;
  newChart:any | null;
  createChart(data:any,lable:any):void{
    //console.log(this.sugarLevelsList);
    if(this.newChart==null) {
      this.newChart = new Chart("tempchart", {
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
    if(this.temprature !=null){
      //create new data
      let data:any=[{
        label: 'Temperature',
        data: [],
        borderWidth: 1,
        borderColor:"#ae2012"
      }];
      let label:any=[];

      this.temprature.sort(function(a,b){
        return a.date.seconds - b.date.seconds;
      });


      for(let x=0,l=this.temprature.length;x<l;x++){
        let d=new Date(this.temprature[x].date.seconds * 1000);
        //console.log([d,this.sugarLevelsList[x].date.seconds]);
        label.push(d.getDate() +"-" + (d.getMonth()+1) + "-" + d.getFullYear().toString().substr(2) +" "+d.getHours() +":" + d.getMinutes());
        data[0].data.push(this.temprature[x].temp);
      }


      this.createChart(data,label);
    }
  }
  ngOnInit(): void {
  
    
  }
}
