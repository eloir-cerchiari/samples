import { Signal, signal } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { VehicleHttpService } from '../adapters/vehicle-http.service';
import { AppInventoryState } from '../contexts/AppInventoryState';

export class LoadVehiclesUseCase {
  constructor(private vehicleHttpService: VehicleHttpService) {}

  handle(): Signal<Vehicle[]> {
    const appState = AppInventoryState.instance();

    this.vehicleHttpService.getVehiclesData().subscribe((vehicles) => {
      appState.vehicles.set(vehicles);
    });

    return appState.vehicles;
  }
}
