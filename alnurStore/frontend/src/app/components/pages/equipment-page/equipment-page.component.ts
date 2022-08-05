import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/app/shared/models/Equipment';

@Component({
  selector: 'app-equipment-page',
  templateUrl: './equipment-page.component.html',
  styleUrls: ['./equipment-page.component.css']
})
export class EquipmentPageComponent implements OnInit {
  equipment!: Equipment;

  constructor(activatedRoute: ActivatedRoute, equipmentService: EquipmentService,
    private cartService: CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        equipmentService.getEquipmentById(params.id).subscribe(serverEquipment => {
          this.equipment = serverEquipment;
        });


    })
  }

  ngOnInit(): void {
  }


  addToCart() {
    this.cartService.addToCart(this.equipment);
    this.router.navigateByUrl('/cart-page');

  }
}
