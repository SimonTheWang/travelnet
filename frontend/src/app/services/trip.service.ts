import { tripModel } from './../components/tabs/mytrip/trip.model';
import { environment } from './../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private _trips: BehaviorSubject<tripModel[]> = new BehaviorSubject([])
  public trips: Observable<tripModel[]> = this._trips.asObservable()

  constructor(private HttpService: HttpService) {
    this.HttpService.get('/user', {})
    .then((response: any) => {
      this._trips.next(response.user.trips)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // modifies trips of user
  modify(triparr: tripModel[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.HttpService.patch('/edit', {
        username: localStorage.getItem('username'),
        proprety: 'trips',
        newProprety: triparr
      })
      .then((response: {[key: string]: any}) => {
        this._trips.next(triparr)
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  //localy update trips of user (when modification is already done)
  update(triparr: tripModel[]) {
    this._trips.next(triparr)
  }
}
