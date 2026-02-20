import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-live-card',
  templateUrl: './live-card.component.html',
  styleUrls: ['./live-card.component.scss'],
  imports: [],
})
export class LiveCardComponent  implements OnInit {
  @Input() teamA!: string;
  @Input() teamB!: string;
  @Input() venue!: string;
  @Input() score!: string;
  @Input() overs!: string;
  @Input() status!: string;
  @Input() teamAScore!: string;
  @Input() teamBScore!: string;


  @Output() viewScorecard = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
    
  }

}
