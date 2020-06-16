import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headerNames: string[];
  @Input() contents: Observable<any>;
  @Input() contentFields: string[] = [];
  @Input() addDeleting = false;

  @Output() clickContent: EventEmitter<any> = new EventEmitter<any>();
  @Output() contentDeleted: EventEmitter<any> = new EventEmitter<any>();

  markedContent;

  constructor() { }

  ngOnInit() {
  }

  getContentFromField(content, field) {
    let result = { ...content };
    const stages = field.split('.');
    stages.forEach((value: string) => {
      if (field === 'date') {
        result = moment(result[value]).format('DD.MM.YYYY');
      } else {
        result = result[value];
      }
    });

    return result;
  }

  click(content) {
    this.clickContent.emit(content);
  }

  clickDelete() {
    this.contentDeleted.emit(this.markedContent);
  }

  markContent(content) {
    this.markedContent = content;
  }

}
