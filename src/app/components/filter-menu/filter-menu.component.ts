import { CategoryModal } from './../../models/category-model';
import { Component, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { IonCheckbox, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {
  @Output('checkbox') checkbox: EventEmitter<any> = new EventEmitter<any>();
  @Input('categories') categories: CategoryModal[] = [];

  collapsed:boolean;

  @ViewChild('checkbox', {static:false}) ionCheckbox:IonCheckbox;


  constructor(
    private menuController:MenuController,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick(){
    this.collapsed = !this.collapsed;
  }

  checkboxSelected(ev:any){
    this.checkbox.emit({
      name: ev.target.name,
      selected: ev.target.checked
    })
  } 
  closeMenu(){
    this.menuController.close('filter').then();
  }
}
