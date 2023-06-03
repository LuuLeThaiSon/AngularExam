import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tour} from "../model/tour";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TourServiceService {

  constructor(private http: HttpClient) { }

  findOne(id:number | any) {
    return this.http.get<Tour>("http://localhost:3000/tours/" + id);
  }

  findAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>("http://localhost:3000/tours")
  }

  create(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>("http://localhost:3000/tours", tour);
  }

  delete(id:number | any) {
    return this.http.delete("http://localhost:3000/tours/" + id);
  }

  edit(id:number, tour: Tour) {
    // let tour = this.findOne(id);
    return this.http.put<Tour>("http://localhost:3000/tours/" + id, tour)
  }
}
