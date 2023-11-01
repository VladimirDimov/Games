import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DynamicOneComponent } from '../dynamic-one/dynamic-one.component';
import { DynamicTwoComponent } from '../dynamic-two/dynamic-two.component';
import { ClosableComponent } from '../closable/closable.component';

@Component({
  selector: 'app-dynamic-home',
  templateUrl: './dynamic-home.component.html',
  styleUrls: ['./dynamic-home.component.scss'],
})
export class DynamicHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('DynamicContainer', { read: ViewContainerRef }) dynamicContainer:
    | ViewContainerRef
    | undefined;
  constructor(public vrc: ViewContainerRef) {}

  ngAfterViewInit(): void {
    this.dynamicContainer?.clear();

    console.log(this.dynamicContainer);
  }

  ngOnInit(): void {}

  addOne() {
    let addedComponent =
      this.dynamicContainer?.createComponent(ClosableComponent);
    addedComponent!.instance.childComponent = DynamicOneComponent;
  }

  addTwo() {
    this.dynamicContainer?.createComponent(DynamicTwoComponent);
  }
}
