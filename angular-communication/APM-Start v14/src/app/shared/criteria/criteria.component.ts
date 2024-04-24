import { OnChanges, SimpleChanges } from '@angular/core';
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
  listFilter: string = '';
  @Input() displayDetail: boolean = false;
  @Input() hitCount: number = 0;
  hitMessage: string = '';

  @ViewChild('filterElement') filterElementRef: ElementRef | undefined;

  constructor() {}
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
