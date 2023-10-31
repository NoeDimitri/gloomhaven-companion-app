import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SignalRService } from './signalr.service';

@Injectable()
export class PrivateSignalRService extends SignalRService {
  private _signalEvent: Subject<any>;

  constructor() {
    super();
    this._signalEvent = new Subject<any>();
  }

  getDataStream(): Observable<any> {
    return this._signalEvent.asObservable();
  }
}
