import { Component, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadVehiclesUseCase } from '../core/usecase/load-vehicles-use-case';
import { VehicleHttpService } from '../core/adapters/vehicle-http.service';
import { Vehicle } from '../core/model/vehicle';
import { AppInventoryState } from '../core/contexts/AppInventoryState';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private loadVehiclesUseCase!: LoadVehiclesUseCase;
  vehicles: Signal<Vehicle[]> = signal<Vehicle[]>([]);

  constructor(private vehicleHttpService: VehicleHttpService) {
    this.loadVehiclesUseCase = new LoadVehiclesUseCase(this.vehicleHttpService);
  }

  ngOnInit() {
    this.vehicles = this.loadVehiclesUseCase.handle();
  }
}
