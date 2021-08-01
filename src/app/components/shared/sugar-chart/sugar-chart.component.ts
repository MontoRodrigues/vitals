import { ISugar } from './../../../interface/Ivital.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-sugar-chart',
  templateUrl: './sugar-chart.component.html',
  styleUrls: ['./sugar-chart.component.css']
})
export class SugarChartComponent implements OnInit {

  @Input() sugarLevelsList : ISugar[] |undefined;
  newChart:any | null;
  createChart(data:any,lable:any):void{
    //console.log(this.sugarLevelsList);
    if(this.newChart==null) {
      this.newChart = new Chart("sgarchart", {
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
    if(this.sugarLevelsList !=null){
      //create new data
      let data:any=[{
        label: 'Sugar Levels',
        data: [],
        borderWidth: 1,
        borderColor:"#ae2012",
        backgroundColor:"#ae2012",
        tension: 0.1
      }];
      let label:any=[];

      this.sugarLevelsList.sort(function(a,b){
        return a.date.seconds - b.date.seconds;
      });


      for(let x=0,l=this.sugarLevelsList.length;x<l;x++){
        let d=new Date(this.sugarLevelsList[x].date.seconds * 1000);
        //console.log([d,this.sugarLevelsList[x].date.seconds]);
        label.push(d.getDate() +"-" + (d.getMonth()+1) + "-" + d.getFullYear().toString().substr(2) +" "+d.getHours() +":" + d.getMinutes());
        data[0].data.push(this.sugarLevelsList[x].sugarLevel);
      }


      this.createChart(data,label);
    }
  }
  ngOnInit(): void {
  
    
  }

}
