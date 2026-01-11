export type ColumnId = 'todo' | 'inProgress' | 'done';
export interface KanbanCard {
  id: string;
  title: string;
}
export interface KanbanColumn {
  id: ColumnId;
  title: string;
  cards: KanbanCard[];
}
export interface KanbanBoard {
  columns: KanbanColumn[];
}
