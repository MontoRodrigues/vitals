import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  
  private _userId = new BehaviorSubject<string>("");
  _userId$ = this._userId.asObservable();
  
  constructor() { }

  setUserId(uid: string) : void {
    this._userId.next(uid);
  }

  getUserId() : string{
    return this._userId.getValue();
  }
}
