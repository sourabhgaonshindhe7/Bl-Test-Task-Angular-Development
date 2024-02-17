import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State } from '../models/state.model'
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedDataSubject.asObservable();
  private sharedStatesSubject = new BehaviorSubject<State[]>([]);
  sharedStates$ = this.sharedStatesSubject.asObservable();

  private sharedNewStatesSubject = new BehaviorSubject<Map<String, String>>(new Map());
  sharedNewStates$ = this.sharedNewStatesSubject.asObservable();

  setSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }
  setNewStates(states: Map<String, String>) {
    this.sharedNewStatesSubject.next(states);
  }
}
