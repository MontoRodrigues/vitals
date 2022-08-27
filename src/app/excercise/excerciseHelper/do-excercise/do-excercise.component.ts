import { ExcerciseHelperService } from './../../../services/excercise-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-do-excercise',
  templateUrl: './do-excercise.component.html',
  styleUrls: ['./do-excercise.component.css']
})
export class DoExcerciseComponent implements OnInit {

  private patientID: string = "";
  execercieseList: any = [];
  aexcer: any | undefined;

  playExcerciseList: any = [];
  currentExcercise: any = {};
  currentStep: any = {};
  stepCounter: number = 0;
  excerciseCounter: number = 0;
  timer: number = 0;
  timeInterval: any | undefined;

  public audioExcercise: any | undefined;
  public audio_sec: any | undefined;


  getAudioURL(d: any): string {
    //console.log(this.currentImage.images);
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/exercise%2F" + this.patientID + "%2F" + d.id + "%2F" + d.audio + "?alt=media";
  }

  playAudio(audio: any) {
    if (audio != undefined)
      audio.play();
  };

  startTimer() {
    if (!this.CheckIfStepIsEmpty())
      this.timer = 5;
    else
      this.timer = this.currentStep.duration;

    this.timeInterval = setInterval(() => {
      this.timer--;

      if (this.timer < 1) {
        this.StopTimer();
        if (!this.CheckIfStepIsEmpty())
          this.goToNextStep();
        else if (this.stepCounter >= this.currentExcercise.steps.length)
          this.goToNextExcercise();
      }
    }, 1000);
   }


  StopTimer() {
    clearInterval(this.timeInterval);
  }

  goToNextExcercise() {
    if (this.playExcerciseList.length > this.excerciseCounter) {
      this.currentStep = {};
      this.stepCounter = 0;
      this.currentExcercise = this.playExcerciseList[this.excerciseCounter];
      this.excerciseCounter++;
      this.startTimer();
    }
    else {
      this.currentExcercise = [];
      this.excerciseCounter = 0;
    }
  }

  goToNextStep() {
    console.log("Next Step:"+ this.stepCounter);
    if (this.currentExcercise.steps.length > 0) {
      if (this.stepCounter < this.currentExcercise.steps.length) {
        this.currentStep = this.currentExcercise.steps[this.stepCounter];
        this.stepCounter++;
        this.startTimer();
      }
      else {
        this.currentStep = {};
        this.stepCounter = 0;
        this.goToNextExcercise();
      }
    }
  };


//---------------Add excecise to list
  playAll(): void {
    if (this.execercieseList.length > 0) {
      this.playExcerciseList = [];
      for (let c of this.execercieseList) {
        for (let e of c.data) {
          this.playExcerciseList.push(e);
        }
      }
      this.play();
    }
    else
      alert("No excercise found !");


  }

  playCategory(i: number): void {
    if (this.execercieseList[i].data.length > 0) {
      this.playExcerciseList = this.execercieseList[i].data;
      this.play();
    }
  }

  playExcercise(d: any): void {
    this.playExcerciseList = [];
    this.playExcerciseList.push(d);
    this.play();
  }
//---------------------

  play(): void {
    if (this.playExcerciseList.length > 0) {
      this.excerciseCounter = 0;
      this.currentStep = {};
      this.stepCounter = 0;
      this.currentExcercise = this.playExcerciseList[this.excerciseCounter];
      this.excerciseCounter++;
      this.startTimer();
    }
  }

  Stop(): void {
    this.playExcerciseList = [];
  }

  CheckIfStepIsEmpty(): boolean {
    if (Object.keys(this.currentStep).length > 0)
      return true;
    else
      return false;
  }
  private genrateData(d: any) {
    let temp: any = {};
    for (let e of d) {
      if (!temp.hasOwnProperty(e.category))
        temp[e.category] = { "category": e.category, data: [] };
      temp[e.category].data.push(e);
    }
    this.execercieseList = [];
    for (let k in temp) {
      this.execercieseList.push(temp[k]);
    }
    console.log("test",this.execercieseList);
  };

  getImageURL(d: any): string {
    //console.log(this.currentImage.images);
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/exercise%2F" + this.patientID + "%2F" + d.id + "%2F" + d.image + "?alt=media";
  }

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private es: ExcerciseHelperService) {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if (this.patientID == "")
      this.router.navigate(['/home']);

    es.setPatientID(this.patientID);

    this.aexcer = es.excerciseList$.subscribe(p => {
      console.log(p);
      this.genrateData(p);
    });
  }

  public gotoRoute(p: string) {
    if (this.patientID != "") {
      this.router.navigate(['/' + p, { pid: this.patientID }]);
    }
  }

  ngOnInit(): void {
  }

}
