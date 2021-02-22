import { Component, OnInit, ChangeDetectorRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { DnngComponentBase } from '../base-component/dnng.component.base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: HomeComponent }]
})
export class HomeComponent extends DnngComponentBase {
  title = 'OdbytnikXXXX';

  constructor(cd: ChangeDetectorRef, ngz: NgZone) {
    super(cd, ngz);
  }
}
