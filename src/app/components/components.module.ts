import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DownloadCollectionComponent } from './download-collection/download-collection.component';
import { SelectScheduleComponent } from './select-schedule/select-schedule.component';



@NgModule({
    declarations: [
      //components
  
    DownloadCollectionComponent,
      SelectScheduleComponent
  ],
    imports: [
      //external modules like angular material 
    ],
  
    providers: [
      //service
    ],
  
  })
  export class AppCommonModules {}