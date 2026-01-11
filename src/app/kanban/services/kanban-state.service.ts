import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KanbanBoard, KanbanCard, ColumnId } from '../models/kanban.models';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

const initialBoard: KanbanBoard = {
  columns: [
    {
      id: 'todo',
      title: 'Todo',
      cards: [
        { id: 'c1', title: 'Create initial project plan' },
        { id: 'c2', title: 'Design landing page' },
        { id: 'c3', title: 'Review codebase structure' },
      ],
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      cards: [
        { id: 'c4', title: 'Implement authentication' },
        { id: 'c5', title: 'Set up database schema' },
        { id: 'c6', title: 'Fix navbar bugs' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        { id: 'c7', title: 'Organize project repository' },
        { id: 'c8', title: 'Write API documentation' },
      ],
    },
  ],
};

@Injectable({ providedIn: 'root' })
export class KanbanStateService {
  private boardSubject = new BehaviorSubject<KanbanBoard>(initialBoard);
  board$ = this.boardSubject.asObservable();

  private get board(): KanbanBoard {
    return this.boardSubject.value;
  }

  addCard(columnId: ColumnId) {
    const newCard: KanbanCard = {
      id: Date.now().toString(),
      title: 'New Task',
    };

    const columns = this.board.columns.map((col) =>
      col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
    );

    this.boardSubject.next({ columns });
  }

  deleteCard(columnId: ColumnId, cardId: string) {
    const columns = this.board.columns.map((col) =>
      col.id === columnId
        ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
        : col
    );

    this.boardSubject.next({ columns });
  }

  updateCardTitle(columnId: ColumnId, cardId: string, title: string) {
    const columns = this.board.columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cards: col.cards.map((c) =>
              c.id === cardId ? { ...c, title } : c
            ),
          }
        : col
    );

    this.boardSubject.next({ columns });
  }

  moveCard(
    fromColumnId: ColumnId,
    toColumnId: ColumnId,
    fromIndex: number,
    toIndex: number
  ) {
    const columns = this.board.columns.map((col) => ({
      ...col,
      cards: [...col.cards],
    }));

    const fromCol = columns.find((c) => c.id === fromColumnId)!;
    const toCol = columns.find((c) => c.id === toColumnId)!;

    if (fromCol === toCol) {
      moveItemInArray(fromCol.cards, fromIndex, toIndex);
    } else {
      transferArrayItem(fromCol.cards, toCol.cards, fromIndex, toIndex);
    }

    this.boardSubject.next({ columns });
  }
}
