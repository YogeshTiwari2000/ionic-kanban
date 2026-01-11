import { Component, Input } from '@angular/core';
import { ColumnId, KanbanColumn } from '../../models/kanban.models';
import { KanbanStateService } from '../../services/kanban-state.service';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { KanbanCardComponent } from '../kanban-card/kanban-card.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  imports: [CommonModule, DragDropModule, KanbanCardComponent, IonicModule],
})
export class KanbanColumnComponent {
  @Input() column!: KanbanColumn;
  @Input() connectedDropLists: string[] = [];

  constructor(private state: KanbanStateService) {}

  addCard() {
    this.state.addCard(this.column.id);
  }

  drop(event: CdkDragDrop<any>) {
    this.state.moveCard(
      event.previousContainer.id as ColumnId,
      event.container.id as ColumnId,
      event.previousIndex,
      event.currentIndex
    );
  }

  trackByCardId(index: number, card: any) {
    return card.id;
  }
}
