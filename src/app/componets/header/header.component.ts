import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() count: number;
  @Output()
  changed = new EventEmitter<number>();
  parentCount = 0;
  constructor() { }

  ngOnInit() {
  }

  onClickUpdateParent() {
    this.parentCount++;
    this.changed.emit(this.parentCount);
  }
}
