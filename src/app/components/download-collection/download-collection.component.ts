import { DownloadCollectionServiceService } from './../../services/download-collection-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-collection',
  templateUrl: './download-collection.component.html',
  styleUrls: ['./download-collection.component.css']
})
export class DownloadCollectionComponent implements OnInit {
  patientID:string ="";
  collection:any;
  CollectionName:string=""; 

  private downloadCollection(){
    this.downloadCSVFromJson(this.CollectionName,this.collection);
  }

  public downloadCSVFromJson (filename:any, arrayOfJson:any) {
    // convert JSON to CSV
    const replacer = (key:any, value:any) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(arrayOfJson[0])
    let csv = arrayOfJson.map((row: any) => header.map(fieldName => 
    JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')
  
    // Create link and download
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  public callCollection(){
    this.ds.getCollection(this.CollectionName);
  }

  constructor(private  route:ActivatedRoute,private router: Router, private ds:DownloadCollectionServiceService ) { 

    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if(this.patientID=="")
      this.router.navigate(['/home']);

      ds.setPatientID(this.patientID);
      this.collection =ds.collection$.subscribe(p =>{
        this.collection =p;
        this.downloadCollection();
      });
  }

  public GetCollection(e:any){
    this.CollectionName =e.target.value;
  }

  ngOnInit(): void {
  }

}
