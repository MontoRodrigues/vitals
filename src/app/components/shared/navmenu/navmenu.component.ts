import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  @Input() pid:string ="";

  gotoRoute(p:string){
    if(this.pid !="")
    this.router.navigate(['/'+ p, {pid:this.pid}]); 
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
