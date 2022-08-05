import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_equipments, sample_tags } from 'src/data';
import { EQUIPMENTS_BY_ID_URL, EQUIPMENTS_BY_SEARCH_URL, EQUIPMENTS_BY_TAGS_URL, EQUIPMENTS_TAGS_URL, EQUIPMENTS_URL } from '../shared/constants/urls';
import { Equipment } from '../shared/models/Equipment';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(EQUIPMENTS_URL);
  }

  getAllEquipmentsBySearchTerm(searchTerm: string) {
    return this.http.get<Equipment[]>(EQUIPMENTS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(EQUIPMENTS_TAGS_URL);
  }

  getAllEquipmentsByTag(tag: string): Observable<Equipment[]> {
    return tag == "All" ?
      this.getAll() :
      this.http.get<Equipment[]>(EQUIPMENTS_BY_TAGS_URL + tag);
  }

  getEquipmentById(equipmentId: string): Observable<Equipment> {
    return this.http.get<Equipment>(EQUIPMENTS_BY_ID_URL + equipmentId);
  }

}
