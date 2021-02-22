import { ChangeDetectionStrategy, Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { DnngComponentBase } from './base-component/dnng.component.base';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ { provide: DnngComponentBase, useExisting: AppComponent } ]
})
export class AppComponent extends DnngComponentBase {
  title = 'musclemanNeutritions';
}
