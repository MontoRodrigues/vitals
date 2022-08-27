import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AphasiaAddImagesService } from './../../../services/aphasia-add-images.service';

@Component({
  selector: 'app-name-image',
  templateUrl: './name-image.component.html',
  styleUrls: ['./name-image.component.css']
})
export class NameImageComponent implements OnInit {

  private patientID: string = "";

  //--list of images
  ObjectImageList: any[] = [];
  private aimg: any = null;

  //app
  score = 0;
  currentImage: any = {};
  currentIndex: number = 0;
  completed = false;
  answered = false;

  public audio_aplause: any | undefined;
  public audio_wrong: any | undefined;
  public audio_name: any | undefined;
  public audio_sound_like: any | undefined;
  public audio_half_word: any | undefined;

  playAudio(audio: any) {
    if (audio != undefined)
      audio.play();
  };

  listenName() {
    this.playAudio(this.audio_name);
  };

  listenSoundsLike() {
    this.playAudio(this.audio_sound_like);
  };

  listenHalfWord() {
    this.playAudio(this.audio_half_word);
  };

  public gotoRoute(p: string) {
    if (this.patientID != "") {
      this.router.navigate(['/' + p, { pid: this.patientID }]);
    }
  }

  getImageURL() {
    //console.log(this.currentImage.images);
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/aphasia%2F" + this.patientID + "%2F" + this.currentImage.id  + "%2F" + this.currentImage.images+ "?alt=media";
  }

  getAudioURL(a: string) {
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/aphasia%2F" + this.patientID + "%2F" + this.currentImage.id + "%2F" + a + "?alt=media";
  };

  wrongClick(){
    this.playAudio(this.audio_wrong);
    
    this.answered = true;
  }

  correctClick(){
    if(!this.answered){
      this.score++;
      this.answered = true;
    }
    this.playAudio(this.audio_aplause);
    this.audio_aplause.onended =() => {
      this.audio_aplause.pause();
      this.audio_aplause.currentTime = 0;
      this.getNextImage();
    }
  }
  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private as: AphasiaAddImagesService) {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if (this.patientID == "")
      this.router.navigate(['/home']);

    as.setPatientID(this.patientID);

    this.aimg = as.Objects$.subscribe(p => {
      console.log(p);
      this.ObjectImageList = p;
      this.getNextImage();
    });
  }


  private getNextImage() {
    if (this.currentIndex >= this.ObjectImageList.length) {
      this.completed = true;
    }
    else {
      let d = this.ObjectImageList[this.currentIndex]
      this.currentImage = {

        audio: d.audio,
        id: d.id,
        docID: d.docID,
        name: d.name,
        type: d.type,
        images: d.image[Math.floor(Math.random() * d.image.length)]
      };
      console.log(this.currentImage);

      this.audio_name = new Audio(this.getAudioURL(this.currentImage.audio.name));
      this.audio_sound_like = new Audio(this.getAudioURL(this.currentImage.audio.sounds_like));
      this.audio_half_word = new Audio(this.getAudioURL(this.currentImage.audio.half_word));
      this.answered = false;
      this.currentIndex++;
    }
  };

  ngOnInit(): void {
    this.audio_aplause = new Audio('/assets/music/cheering.mp3');
    this.audio_wrong = new Audio('/assets/music/wrong.mp3');
  }

}
