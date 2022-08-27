import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AphasiaAddImagesService } from './../../../services/aphasia-add-images.service';
@Component({
  selector: 'app-find-image',
  templateUrl: './find-image.component.html',
  styleUrls: ['./find-image.component.css']
})
export class FindImageComponent implements OnInit {

  private patientID: string = "";

  //--list of images
  ObjectImageList: any[] = [];
  private aimg: any = null;

  //---APP
  score = 0;
  answered = false;
  currentImage: any = {};
  currentIndex: number = 0;
  completed = false;
  //sound
  public audio_aplause: any | undefined;
  public audio_wrong: any | undefined;
  public audio_name: any | undefined;
  public audio_sound_like: any | undefined;
  public audio_half_word: any | undefined;


  //--- Image methods
  getImageList(d: any) {
    //console.log(Object.keys(d));
    return Object.keys(d);
  };
  getImageURL(i: any) {
    //console.log(this.currentImage.images);
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/aphasia%2F" + this.patientID + "%2F" + this.currentImage.images[i].id + "%2F" + this.currentImage.images[i].img + "?alt=media";
  }
  getClass(i: any) {
    return "image select-" + this.currentImage.images[i].selected
  }
  getAudioURL(a: string) {
    return "https://firebasestorage.googleapis.com/v0/b/vitals-8dcbd.appspot.com/o/aphasia%2F" + this.patientID + "%2F" + this.currentImage.id + "%2F" + a + "?alt=media";
  };

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
  // click answers method
  imageClick(i: any) {
    

    if (this.currentImage.images[i].isCorrect){
      this.playAudio(this.audio_aplause);
      this.audio_aplause.onended =() => {
        this.audio_aplause.pause();
        this.audio_aplause.currentTime = 0;
        this.getNextImage();
      };
    }
    else
      this.playAudio(this.audio_wrong);

    this.currentImage.images[i].selected = true;
    // keep score
    if (this.currentImage.images[i].isCorrect && !this.answered)
      this.score++;
    this.answered = true;

    // setTimeout(() => {
     
    // }, 5000);


  }




  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private as: AphasiaAddImagesService) {
    this.patientID = this.route.snapshot.paramMap.get('pid') || "";
    if (this.patientID == "")
      this.router.navigate(['/home']);

    as.setPatientID(this.patientID);

    this.aimg = as.Objects$.subscribe(p => {
      console.log(p);
      this.genrateData(p);
    });
  }

  ngOnInit(): void {
    this.audio_aplause = new Audio('/assets/music/cheering.mp3');
    this.audio_wrong = new Audio('/assets/music/wrong.mp3');
  }

  private getAlternative(d: any, i: number, r: any) {
    let index: number = 0;
    while (true) {
      index = Math.floor(Math.random() * d.length);
      //console.log(i,index,i);
      if (index != i && !r.hasOwnProperty(index))
        break;
    }
    return index;
  }

  private getindex(r: any) {
    let index: number = 0;
    while (true) {
      index = Math.floor(Math.random() * 3);
      if (!r.hasOwnProperty(index))
        break;
    }
    return index.toString();
  }

  private genrateDataNode(d: any[], i: number): any {
    let r: any = {
      audio: d[i].audio,
      id: d[i].id,
      docID: d[i].docID,
      name: d[i].name,
      type: d[i].type,
      images: {}
    };

    r.images[this.getindex(r.images)] = {
      id: d[i].id,
      img: d[i].image[Math.floor(Math.random() * d[i].image.length)],
      isCorrect: true,
      selected: false
    };

    //image 2
    let index: number = this.getAlternative(d, i, r.images);
    r.images[this.getindex(r.images)] = {
      id: d[index].id,
      img: d[index].image[Math.floor(Math.random() * d[index].image.length)],
      isCorrect: false,
      selected: false
    };


    index = this.getAlternative(d, i, r.images);
    r.images[this.getindex(r.images)] = {
      id: d[index].id,
      img: d[index].image[Math.floor(Math.random() * d[index].image.length)],
      isCorrect: false,
      selected: false
    };



    return r;
  };

  private genrateData(d: any[]): void {
    this.ObjectImageList = [];
    for (let x = 0, l = d.length; x < l; x++) {
      this.ObjectImageList.push(this.genrateDataNode(d, x))
    }
    console.log(this.ObjectImageList);
    this.getNextImage();
  }

  private getNextImage() {

    if (this.currentIndex >= this.ObjectImageList.length) {
      this.completed=true;
    }
    else {
      console.log(this.currentIndex);
     
      this.currentImage = this.ObjectImageList[this.currentIndex];
      this.answered = false;

      this.audio_name = new Audio(this.getAudioURL(this.currentImage.audio.name));
      this.audio_sound_like = new Audio(this.getAudioURL(this.currentImage.audio.sounds_like));
      this.audio_half_word = new Audio(this.getAudioURL(this.currentImage.audio.half_word));

      this.playAudio(this.audio_name);
      this.currentIndex++;
    }
  }

  public gotoRoute(p: string) {
    if (this.patientID != "") {
      this.router.navigate(['/' + p, { pid: this.patientID }]);
    }
  }



}
