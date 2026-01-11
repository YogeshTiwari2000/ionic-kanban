import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { KanbanCard, ColumnId } from '../../models/kanban.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KanbanStateService } from '../../services/kanban-state.service';

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.scss'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanCardComponent {
  @Input() card!: KanbanCard;
  @Input() columnId!: ColumnId;

  localTitle = '';

  constructor(private state: KanbanStateService) {}

  ngOnInit() {
    this.localTitle = this.card.title;
  }

  delete() {
    this.state.deleteCard(this.columnId, this.card.id);
  }

  onInputChange(value: string) {
    this.localTitle = value;
  }

  persistTitle() {
    if (this.localTitle !== this.card.title) {
      this.state.updateCardTitle(this.columnId, this.card.id, this.localTitle);
    }
  }
}
