import { Injectable } from '@angular/core';
import { sample_equipments } from 'src/data';
import { Equipment } from '../shared/models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor() { }

  getAll(): Equipment[] {
    return sample_equipments
  }

  getAllEquipmentsBySearchTerm(serchTerm: string) {
    return this.getAll().filter(equipment => equipment.name.toLowerCase().includes(serchTerm.toLowerCase()))
  }
}
