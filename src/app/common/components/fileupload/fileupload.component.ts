import { IFileList } from './fileList.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})

export class FileuploadComponent implements OnInit {

  @Output() getFiles = new EventEmitter();
  @Input() header_text :string ="Select File";
  @Input() accept_file :string ="image/*,.pdf";

  constructor(private dom: DomSanitizer) { }

  ngOnInit(): void {
  }

  fileList:IFileList[] =[];

  public UpdateParent(){
    this.getFiles.emit(this.fileList);
  }

  public addfiles(e:any){
    for (let i = 0; i < e.target.files.length; i++) {
      let filname:string=Guid.create().toString() +"."+(e.target.files.item(i).name.substring(e.target.files.item(i).name.lastIndexOf('.')+1, e.target.files.item(i).name.length) || e.target.files.item(i).name);
      let fname:IFileList={
        "name":filname,
        file:e.target.files.item(i),
        imgURL:this.dom.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files.item(i)))
      };
      this.fileList.push(fname);
    }
    this.UpdateParent();
  }

  public removeFile(i:any):void{
    this.fileList.splice(i, 1);
    this.UpdateParent();
  }

  public removeAllFiles(){
    this.fileList=[];
    this.UpdateParent();
  };

}
