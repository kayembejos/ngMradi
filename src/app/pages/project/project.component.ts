import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
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

@Component({
  selector: 'app-project',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    AsyncPipe,
    MatDividerModule,
    RouterLink,
    DatePipe,
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

  formatedDate = (t?: Timestamp) => this.fs.formatedTimestamp(t);

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.projectSub?.unsubscribe();
  }
}
