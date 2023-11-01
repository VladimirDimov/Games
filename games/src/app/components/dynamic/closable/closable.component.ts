import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-closable',
  templateUrl: './closable.component.html',
  styleUrls: ['./closable.component.scss'],
})
export class ClosableComponent implements OnInit, AfterViewInit {
  @Input() childComponent: any;
  @ViewChild('Container', { read: ViewContainerRef }) dynamicContainer:
    | ViewContainerRef
    | undefined;

  isVisible: boolean = true;

  ngOnInit(): void {
    fromEvent(document, 'keydown').pipe(
      tap((e) => {
        console.log(e);
      })
    );
  }

  ngAfterViewInit(): void {
    this.dynamicContainer?.clear();

    if (this.childComponent) {
      this.dynamicContainer?.createComponent(this.childComponent);
    }
  }

  close() {
    this.isVisible = false;
  }
}
