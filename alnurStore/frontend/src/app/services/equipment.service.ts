import { Injectable } from '@angular/core';
import { sample_equipments, sample_tags } from 'src/data';
import { Equipment } from '../shared/models/Equipment';
import { Tag } from '../shared/models/Tags';

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

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllEquipmentsByTag(tag: string): Equipment[] {
    return tag == "All" ?
      this.getAll() :
      this.getAll().filter(equipment => equipment.tags?.includes(tag));
  }

  getEquipmentById(equipmentId: string): Equipment {
    return this.getAll().find(equipment => equipment.id == equipmentId) ?? new Equipment();
  }

}
