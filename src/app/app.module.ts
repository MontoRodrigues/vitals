import { SelectScheduleComponent } from './components/select-schedule/select-schedule.component';
import { FileuploadComponent } from './common/components/fileupload/fileupload.component';
import { CommonModule } from "@angular/common";

import { HomeService } from './services/home.service';
import { environment } from './../environments/environment';

import { ScheduleService } from './services/schedule.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { VitalsComponent } from './components/vitals/vitals.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PatientblockComponent } from './components/shared/patientblock/patientblock.component';
import { SchedulelistComponent } from './components/shared/schedulelist/schedulelist.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { PatientComponent } from './components/patient/patient.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { AddMedicineComponent } from './components/add-medicine/add-medicine.component';
import { SugarChartComponent } from './components/shared/sugar-chart/sugar-chart.component';
import { BloodperssureChartComponent } from './components/shared/bloodperssure-chart/bloodperssure-chart.component';
import { BloodperssurePulseChartComponent } from './components/shared/bloodperssure-pulse-chart/bloodperssure-pulse-chart.component';
import { Spo2chartComponent } from './components/shared/spo2chart/spo2chart.component';
import { Spo2PulsechartComponent } from './components/shared/spo2-pulsechart/spo2-pulsechart.component';
import { TempratureChartComponent } from './components/shared/temprature-chart/temprature-chart.component';
import { NavmenuComponent } from './components/shared/navmenu/navmenu.component';
import { DailyScheduleComponent } from './components/daily-schedule/daily-schedule.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HospitalisationComponent } from './components/hospitalisation/hospitalisation.component';
import { FindImageComponent } from './excercise/aphasia/find-image/find-image.component';
import { ExcerciseHomeComponent } from './excercise/excercise-home/excercise-home.component';
import { AddFindImageComponent } from './excercise/aphasia/add-find-image/add-find-image.component';
import { NameImageComponent } from './excercise/aphasia/name-image/name-image.component';
import { AddExcerciseComponent } from './excercise/excerciseHelper/add-excercise/add-excercise.component';
import { DoExcerciseComponent } from './excercise/excerciseHelper/do-excercise/do-excercise.component';



//console.log(environment);

@NgModule({
  declarations: [
    AppComponent,
    VitalsComponent,
    ScheduleComponent,
    PatientblockComponent,
    SchedulelistComponent,
    HomeComponent,
    PatientComponent,
    PrescriptionComponent,
    AddMedicineComponent,
    SugarChartComponent,
    BloodperssureChartComponent,
    BloodperssurePulseChartComponent,
    Spo2chartComponent,
    Spo2PulsechartComponent,
    TempratureChartComponent,
    NavmenuComponent,
    DailyScheduleComponent,
    ReportsComponent,
    HospitalisationComponent,
    SelectScheduleComponent,
    //------
    FileuploadComponent,
    FindImageComponent,
    ExcerciseHomeComponent,
    AddFindImageComponent,
    NameImageComponent,
    AddExcerciseComponent,
    DoExcerciseComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule
  ],
  providers: [
   
    ScheduleService,
    HomeService
    //{ provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
