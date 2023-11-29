import { Signal, WritableSignal, signal } from '@angular/core';
import { Vehicle } from '../model/vehicle';

export class AppInventoryState {
  private static _instance?: AppInventoryState;

  private constructor() {}

  static instance(): AppInventoryState {
    if (!this._instance) {
      this._instance = new AppInventoryState();
    }
    return this._instance;
  }

  private _vehicles: WritableSignal<Vehicle[]> = signal<Vehicle[]>([]);
  get vehicles(): WritableSignal<Vehicle[]> {
    return this._vehicles;
  }
  set vehicles(vehicles: WritableSignal<Vehicle[]>) {
    this._vehicles = vehicles;
  }
}
