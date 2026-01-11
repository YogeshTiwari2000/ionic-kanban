import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';
import { KanbanStateService } from '../../services/kanban-state.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  imports: [CommonModule, KanbanColumnComponent, AsyncPipe],
})
export class KanbanBoardComponent {
  board$ = this.state.board$;

  constructor(private state: KanbanStateService) {}

  getConnectedDropLists(columns: { id: string }[]): string[] {
    return columns.map((col) => col.id);
  }
}
