import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Tag } from 'src/app/shared/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?: Tag[];

  constructor(equipmentService: EquipmentService) {
    this.tags = equipmentService.getAllTags();
  }

  ngOnInit(): void {
  }

}
