import { IOxygen } from './../../../interface/Ivital.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-spo2-pulsechart',
  templateUrl: './spo2-pulsechart.component.html',
  styleUrls: ['./spo2-pulsechart.component.css']
})
export class Spo2PulsechartComponent implements OnInit {

  @Input() spo2List : IOxygen[] |undefined;
  newChart:any | null;
  createChart(data:any,lable:any):void{
    //console.log(this.sugarLevelsList);
    if(this.newChart==null) {
      this.newChart = new Chart("spo2pulsechart", {
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
    if(this.spo2List !=null){
      //create new data
      let data:any=[{
        label: 'SPO2 Pulse',
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
        data[0].data.push(this.spo2List[x].pulse);
      }
      this.createChart(data,label);
    }
  }
  ngOnInit(): void {
  }

}
