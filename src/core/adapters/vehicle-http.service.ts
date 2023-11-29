import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Vehicle } from '../model/vehicle';

type jsonVehicleResponse = {
  dealership: string;
  inventory: Vehicle[];
};

@Injectable({
  providedIn: 'root',
})
export class VehicleHttpService {
  private jsonUrl = 'assets/vehicle_inventory.json';
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  getVehiclesData(): Observable<Vehicle[]> {
    return this.http.get<jsonVehicleResponse>(this.jsonUrl).pipe(
      shareReplay(1),

      map((response: { inventory: Vehicle[] }) => response.inventory)
    );
  }
}
