import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss'],
})
export class DetailsPanelComponent implements OnChanges {
  @Input() panelClass: string;
  @Input() opened = false;
  @Input() panelWidth = '644px';
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes.opened) {
      if (changes.opened.currentValue) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  open() {
    this.opened = true;
    this.openedChange.emit(true);
  }

  close() {
    this.opened = false;
    this.openedChange.emit(false);
  }
}
