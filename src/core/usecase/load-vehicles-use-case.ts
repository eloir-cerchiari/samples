import { Signal, WritableSignal, signal } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { VehicleHttpService } from '../adapters/vehicle-http.service';
import { AppInventoryState } from '../contexts/AppInventoryState';

export class LoadVehiclesUseCase {
  constructor(private vehicleHttpService: VehicleHttpService) {}

  handle(): Signal<Vehicle[]> {
    const appState = AppInventoryState.instance();

    const vehiclesAppState = appState.vehicles as WritableSignal<Vehicle[]>;

    if (vehiclesAppState().length > 0) {
      return vehiclesAppState;
    }
    this.vehicleHttpService.getVehiclesData().subscribe((vehicles) => {
      vehiclesAppState.set(vehicles);
    });

    return vehiclesAppState;
  }
}
