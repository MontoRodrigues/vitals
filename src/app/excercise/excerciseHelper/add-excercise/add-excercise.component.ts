import { ExcerciseHelperService } from './../../../services/excercise-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';


declare var MediaRecorder: any;

@Component({
  selector: 'app-add-excercise',
  templateUrl: './add-excercise.component.html',
  styleUrls: ['./add-excercise.component.css']
})
export class AddExcerciseComponent implements OnInit {
  @ViewChild('btn') btn: any;
  @ViewChild('btn1') btn1: any;

  private patientID: string = "";
  public mediaRecorder: any | undefined;
  public chunks: any = [];
  public excercise: any = {
    category: null,
    type: null,
    name: null,
    duration: null,
    audio: {},
    steps: [],
    image: "",
    description: null
  };
  public excerciseImage: any = {url:"",file:null};
  public steps = {
    audio: {},
    duration: 0,
    description: null,
    image: ""
  }
  public stepImage: any = {url:"",file:null};
  public accept_file: string = "image/*";

  public excerciseRecording = false;
  public stepsRecording = false;
  public excercisePlay = false;
  public stepsPlay = false;
  public recordingFor: any = null;


  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  alertFunction(i: any, msg: any) {
    Swal.fire({
      icon: i,
      title: msg,
      showConfirmButton: true,
      toast: false,
      position: "center"
    });
    if (i == 'error')
      this.btn.nativeElement.disabled = false;
    this.btn1.nativeElement.disabled = false;
  }

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private es:ExcerciseHelperService) {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if (this.patientID == "")
      this.router.navigate(['/home']);

      es.setPatientID(this.patientID);
  }

  public addSteps() {
    this.btn.nativeElement.disabled = true;

    if (this.stepImage.file== null) {
      this.alertFunction('error', 'Please add Image');
      return false;
    }

    if (Object.keys(this.steps.audio).length == 0) {
      this.alertFunction('error', 'Please add audio instruction');
      return false;
    }
    if (this.steps.duration == null || this.steps.duration == 0) {
      this.alertFunction('error', 'Please add duration');
      return false;
    }

    if (this.steps.description == null || this.steps.description == "") {
      this.alertFunction('error', 'Please add description');
      return false;
    }

    this.steps.image = this.stepImage;

    this.excercise.steps.push(this.steps);


    this.steps = {
      audio: {},
      duration: 0,
      description: null,
      image: ""
    }
    this.stepImage =  {url:"",file:null};

    

    this.btn.nativeElement.disabled = false;

    return true;
  }

  private moveArrayItemToNewIndex(arr: any, old_index: any, new_index: any) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  public deleteSteps(index: number) {
    this.excercise.steps.splice(index, 1);
  }

  public moveSteps(index: number, direction: string) {

    if (direction == "up") {
      if (index > 0)
        this.moveArrayItemToNewIndex(this.excercise.steps, index, index - 1);
    }
    else {
      if (index < this.excercise.steps.length - 1)
        this.moveArrayItemToNewIndex(this.excercise.steps, index, index + 1);
    }
  }

  public getObjectLength(d: any) {
    return Object.keys(d).length;
  }
  public gotoRoute(p: string) {
    if (this.patientID != "") {
      this.router.navigate(['/' + p, { pid: this.patientID }]);
    }
  }

  public addfiles(e: any, t: string) {
    //console.log(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0])));
    if (t == "excercise") {
      this.excerciseImage = {
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0])),
        file: e.target.files[0]
      };
    }
    else {
      this.stepImage = {
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0])),
        file: e.target.files[0]
      };
    }
  }

  public startRecordig(d: string) {
    this.recordingFor = d;
    if (d == "excecise") {
      this.excerciseRecording = true;
    }
    else {
      this.stepsRecording = true;
    }

    if (this.mediaRecorder)
      this.mediaRecorder.start();
  }

  public stopRecording() {
    this.excerciseRecording = false;
    this.stepsRecording = false;

    if (this.mediaRecorder)
      this.mediaRecorder.stop();
  }

  public playAudio(d: any) {
    const blob = new Blob(d.chunks, { 'type': 'audio/mp3' });
    // const f:any = new File([blob], "foo.mp3", {
    //   type: 'audio/mp3',
    // });
    // console.log(f);
    const audioURL: any = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.audioSource = audioURL;
  }
  audioSource: any | undefined;

  public addExcercise() {
    this.btn.nativeElement.disabled = true;
    //validating form 
    if (this.excercise.steps.length == 0) {
      this.alertFunction('error', 'Please add steps');
      return false;
    }

    if (this.excercise.category == null || this.excercise.category == "") {
      this.alertFunction('error', 'Please add Excercise Category');
      return false;
    }

    if (this.excercise.type == null || this.excercise.type == "") {
      this.alertFunction('error', 'Please add Excercise Type');
      return false;
    }

    if (this.excercise.name == null || this.excercise.name == "") {
      this.alertFunction('error', 'Please add Excercise Name');
      return false;
    }

    if (this.excercise.duration == null || this.excercise.duration == 0) {
      this.alertFunction('error', 'Please add Excercise duration');
      return false;
    }

    if (this.excercise.description == null || this.excercise.description == "") {
      this.alertFunction('error', 'Please add Excercise description');
      return false;
    }


    if (this.excerciseImage == null) {
      this.alertFunction('error', 'Please add Image');
      return false;
    }

    if (Object.keys(this.excercise.audio).length == 0) {
      this.alertFunction('error', 'Please add audio instruction');
      return false;
    }

    this.excercise.image = this.excerciseImage;

    this.es.addExcercise(this.excercise,this.patientID);

    console.log(this.excercise);

     this.excercise= {
      category: null,
      type: null,
      name: null,
      duration: null,
      audio: {},
      steps: [],
      image: "",
      description: null
    };
    this.excerciseImage= {url:"",file:null};;

   


    //this.btn.nativeElement.disabled = false;

    return true;

  };

  ngOnInit(): void {
    if (navigator.mediaDevices) {
      const constraints = { audio: true };

      navigator.mediaDevices.getUserMedia(constraints).then((stream: any) => {

        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.onstop = (e: any) => {
          // const blob = new Blob(this.chunks, { 'type' : 'audio/ogg' });
          // const audioURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          //this.audioSource=audioURL;
          //console.log(this.chunks);

          if (this.recordingFor == "excecise")
            this.excercise.audio = { id: this.generateUUID(), type: "", chunks: this.chunks };
          else
            this.steps.audio = { id: this.generateUUID(), type: "", chunks: this.chunks };

          this.recordingFor = null;

          console.log(this.excercise);
          console.log(this.steps);

          this.chunks = [];

          //console.log(this.audioList);
        };

        this.mediaRecorder.ondataavailable = (e: any) => {
          this.chunks.push(e.data);
        };



        ///------canvas function start---

        let canvas = <HTMLCanvasElement>document.getElementById('visualizer');
        let audioCtx: any;
        let canvasCtx: any;
        if (canvas != null)
          canvasCtx = canvas.getContext("2d");

        if (!audioCtx) {
          audioCtx = new AudioContext();
        }

        const source = audioCtx.createMediaStreamSource(stream);

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);
        //analyser.connect(audioCtx.destination);

        draw()

        function draw() {
          const WIDTH = canvas.width
          const HEIGHT = canvas.height;

          requestAnimationFrame(draw);

          analyser.getByteTimeDomainData(dataArray);

          //background color
          canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = 'rgb(255, 255, 255)';

          canvasCtx.beginPath();

          let sliceWidth = WIDTH * 1.0 / bufferLength;
          let x = 0;


          for (let i = 0; i < bufferLength; i++) {

            let v = dataArray[i] / 128.0;
            let y = v * HEIGHT / 2;

            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();

        }

        //-------canvas function end----
      }, (err: any) => {
        console.log('The following error occured: ' + err);
      });
    }
  }

}
