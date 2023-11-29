import { Signal, WritableSignal, signal } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { VehicleHttpService } from '../adapters/vehicle-http.service';
import { AppInventoryState } from '../contexts/AppInventoryState';

export class LoadVehiclesUseCase {
  constructor(private vehicleHttpService: VehicleHttpService) {}

  handle(usesCache = true): Signal<Vehicle[]> {
    const appState = AppInventoryState.instance();

    if (appState.vehicles.length > 0 && usesCache) {
      return appState.vehicles;
    }

    this.vehicleHttpService.getVehiclesData().subscribe((vehicles) => {
      appState.vehicles = vehicles;
    });

    return appState.vehicles;
  }
}
