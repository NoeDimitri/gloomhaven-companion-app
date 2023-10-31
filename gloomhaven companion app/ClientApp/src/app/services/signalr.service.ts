import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class SignalRService {
  abstract getDataStream(): Observable<any>
}
