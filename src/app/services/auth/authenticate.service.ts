import { Interface } from 'readline';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import {IUser} from '../../interface/auth/auth.interface'

@Injectable({
  providedIn: 'root'
})


export class AuthenticateService {

  private _userId = new BehaviorSubject<IUser>({  
    email:null,
    uid: null,
    photoURL:null,
    displayName:null});
  _userId$ = this._userId.asObservable();
  
  constructor(public afs: AngularFirestore) { }

  setUserId(uid: IUser) : void {
    this._userId.next(uid);
  }

  getUserId() : IUser{
    return this._userId.getValue();
  }


}
