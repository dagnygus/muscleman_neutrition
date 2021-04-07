import { Observable } from 'rxjs';
import { ChangeDetectionStrategy,
         Component,
         Input,
         EventEmitter,
         ChangeDetectorRef,
         NgZone,
         ElementRef,
         Renderer2,
         ViewChild,
         Output,
         OnInit} from '@angular/core';
import { DnngComponentBase } from '../../base-component/dnng.component.base';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: DnngComponentBase, useExisting: CardComponent }]
})
export class CardComponent extends DnngComponentBase implements OnInit {

  private _onCardClick = new EventEmitter<void>();
  private _onBasketClick = new EventEmitter<void>();

  @Input() name!: string;
  @Input() price!: string;
  @Input() imageUrl!: string;
  @Input() rating!: number;

  @Output() get onCardClick(): Observable<void> {
    return this._onCardClick;
  }
  @Output() get onBasketClick(): Observable<void> {
    return this._onBasketClick;
  }

  @ViewChild('basketButton')
  private basketButtonRef: ElementRef<HTMLButtonElement> | null = null;

  constructor(cd: ChangeDetectorRef,
              ngz: NgZone,
              private elementRef: ElementRef<HTMLElement>,
              private renderer: Renderer2) {
    super(cd, ngz);
  }

  ngOnInit(): void {
    this.renderer.listen(this.elementRef.nativeElement, 'click', (event: Event) => {
      if ((event.target as HTMLElement).closest('div.card-footer')) {
        this._onBasketClick.emit();
      } else {
        this._onCardClick.emit();
      }
    });
  }
}
