import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../core/models/project.model';
import { Title } from '@angular/platform-browser';
import { FirestoreService } from '../../core/services/firebase/firestore.service';
import { AuthService } from '../../core/services/firebase/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetProjectComponent } from '../home/projects/set-project/set-project.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { SetTodoComponent } from './todo/set-todo.component';
import { Task } from '../../core/models/task.model';
import { TodoComponent } from './todo/todo.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    AsyncPipe,
    MatDividerModule,
    RouterLink,
    DatePipe,
    TodoComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export default class ProjectComponent implements OnInit, OnDestroy {
  id = input('id');
  projectSub?: Subscription;
  project?: Project<Timestamp>;

  readonly dialog = inject(MatDialog);
  readonly title = inject(Title);
  private fs = inject(FirestoreService);
  private auth = inject(AuthService);
  readonly user$ = this.auth.user;
  private snackBar = inject(MatSnackBar);
  date = new Date();

  todos$?: Observable<Task<Timestamp>[]>;
  inProgresses$?: Observable<Task<Timestamp>[]>;
  dones$?: Observable<Task<Timestamp>[]>;

  formatedDate = (t?: Timestamp) => this.fs.formatedTimestamp(t);

  ngOnInit(): void {
    this.todos$ = this.fs.getTodos(this.id(), 'backlog');
    this.inProgresses$ = this.fs.getTodos(this.id(), 'in-progress');
    this.dones$ = this.fs.getTodos(this.id(), 'done');

    this.projectSub = this.fs
      .getDocData(this.fs.projectCol, this.id())
      .subscribe((project) => {
        this.project = project as Project<Timestamp>;
        this.title.setTitle(`${this.project.title} - ngMradi`);
      });
  }

  onEditProject(project: Project<Timestamp>) {
    this.dialog.open(SetProjectComponent, {
      width: '30rem',
      disableClose: true,
      data: project,
    });
  }

  onDeleteProject(id: string) {
    this.fs.deleteData(this.fs.projectCol, id);
    const message = 'Projet suprimé avec succès';
    this.snackBar.open(message, '', { duration: 5000 });
  }

  onSetTodo(projectId: string) {
    this.dialog.open(SetTodoComponent, {
      width: '35rem',
      disableClose: true,
      data: { projectId },
    });
  }

  drop(
    event: CdkDragDrop<Task<Timestamp>[] | null>,
    status: 'backlog' | 'in-progress' | 'done'
  ) {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data![
        event.previousIndex
      ] as Task<FieldValue>;

      task.moved = true;
      task.status = status;
      this.fs.setTask(this.id(), task);
    }
  }

  ngOnDestroy(): void {
    this.projectSub?.unsubscribe();
  }
}
