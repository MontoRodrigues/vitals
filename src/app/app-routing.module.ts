import { HospitalisationComponent } from './components/hospitalisation/hospitalisation.component';
import { DailyScheduleComponent } from './components/daily-schedule/daily-schedule.component';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { PatientComponent } from './components/patient/patient.component';
import { HomeComponent } from './components/home/home.component';
import { VitalsComponent } from './components/vitals/vitals.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
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
