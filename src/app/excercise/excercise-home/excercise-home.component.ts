import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excercise-home',
  templateUrl: './excercise-home.component.html',
  styleUrls: ['./excercise-home.component.css']
})
export class ExcerciseHomeComponent implements OnInit {

  private patientID:string ="";
  constructor(private  route:ActivatedRoute,private router: Router) {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);
   }

   public gotoRoute(p:string){
     console.log(p)
    if(this.patientID!=""){
      this.router.navigate(['/'+ p, {pid:this.patientID}]);   
    }
  }

  ngOnInit(): void {
  }

}
