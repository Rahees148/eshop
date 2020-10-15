import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss'],
})
export class SortModalComponent implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss(null, 'cancel').then();
  }

  radioChanged(ev:any){
    this.modalController.dismiss(ev.target.value, 'sort').then();
  }

}
