import { Component, OnInit, ViewChild, OnDestroy, ComponentFactoryResolver, Input, Type } from '@angular/core';
import { ModalDirective } from '../../directives/modal.directive';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() component : Type<any>
  @ViewChild(ModalDirective) adHost: ModalDirective;
  constructor
  (
    private componentFactoryResolver: ComponentFactoryResolver,
    public bsModalRef: BsModalRef
  ) { }
  title = "";
  closeBtnName = "Close";

  ngOnInit() 
  {
    this.loadComponent();
  }

  loadComponent()
  {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    //(<AdComponent>componentRef.instance).data = adItem.data;
  }

  ngOnDestroy()
  {
    //clearInterval()
  }

}
