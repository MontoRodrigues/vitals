import { DoExcerciseComponent } from './excercise/excerciseHelper/do-excercise/do-excercise.component';
import { AddExcerciseComponent } from './excercise/excerciseHelper/add-excercise/add-excercise.component';
import { NameImageComponent } from './excercise/aphasia/name-image/name-image.component';
import { AddFindImageComponent } from './excercise/aphasia/add-find-image/add-find-image.component';
import { FindImageComponent } from './excercise/aphasia/find-image/find-image.component';
import { ExcerciseHomeComponent } from './excercise/excercise-home/excercise-home.component';
import { SelectScheduleComponent } from './components/select-schedule/select-schedule.component';
import { DownloadCollectionComponent } from './components/download-collection/download-collection.component';
import { HospitalisationComponent } from './components/hospitalisation/hospitalisation.component';
import { DailyScheduleComponent } from './components/daily-schedule/daily-schedule.component';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { PatientComponent } from './components/patient/patient.component';
import { HomeComponent } from './components/home/home.component';
//import { HomeComponent } from './vitals/components/home/home.component';
import { VitalsComponent } from './components/vitals/vitals.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [

  //------------
  
  {
    path: 'addexercise',
    component: AddExcerciseComponent
  },
  {
    path: 'doexercise',
    component: DoExcerciseComponent
  },
  {
    path: 'nameImage',
    component: NameImageComponent
  },
  {
    path: 'findImage',
    component: FindImageComponent
  },
  {
    path: 'addfindImage',
    component: AddFindImageComponent
  },
  
  {
    path: 'excercise',
    component: ExcerciseHomeComponent
  },
  //------------
  {
    path: 'download',
    component: DownloadCollectionComponent
  },
  {
    path: 'selectschedule',
    component: SelectScheduleComponent
  },
  
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'hospitalisation',
    component: HospitalisationComponent
  },
  {
    path: 'vitals',
    component: VitalsComponent
  },

  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'dailyschedule',
    component: DailyScheduleComponent
  },
  {
    path: 'patient',
    component: PatientComponent
  },
  {
    path: 'prescription',
    component: PrescriptionComponent
  },
  {
    path: 'addmedicine',
    component: AddMedicineComponent
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
