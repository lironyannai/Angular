import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/app/shared/models/Equipment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  equipments: Equipment[] = [];

  constructor(private equipmentService: EquipmentService, activatedRoute: ActivatedRoute) {
    let equipmentsObservable: Observable<Equipment[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        equipmentsObservable = this.equipmentService.getAllEquipmentsBySearchTerm(params.searchTerm);
      else if (params.tag)
        equipmentsObservable = this.equipmentService.getAllEquipmentsByTag(params.tag)
      else
        equipmentsObservable = equipmentService.getAll();

      equipmentsObservable.subscribe((serverEquipments) => {
        this.equipments = serverEquipments;
      })
    })
  }

  ngOnInit(): void {
  }

}
