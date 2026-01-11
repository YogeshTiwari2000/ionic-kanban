import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { KanbanBoardComponent } from '../app/kanban/components/kanban-board/kanban-board.component';
import { KanbanStateService } from '../app/kanban/services/kanban-state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, KanbanBoardComponent, AsyncPipe],
})
export class AppComponent {
  constructor(public state: KanbanStateService) {}
}
