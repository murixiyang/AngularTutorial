import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css'],
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() displayDetail: boolean = false;
  @Input() hitCount: number = 0;
  hitMessage: string = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  // Execute everytime _listFilter changes
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() {}

  // Execute when input property changes by parent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }

  ngAfterViewInit(): void {
    this.filterElementRef?.nativeElement.focus();
  }

  ngOnInit(): void {}
}
