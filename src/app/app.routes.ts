import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'kanban-board',
    pathMatch: 'full',
  },
  {
    path: 'kanban-board',
    loadComponent: () =>
      import('./kanban/components/kanban-board/kanban-board.component').then(
        (m) => m.KanbanBoardComponent
      ),
  },
];
