import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatSidenavModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  template: `
    <mat-drawer-container>
      <mat-drawer mode="side" opened>
        <a routerLink="/projects" mat-menu-item routerLinkActive="active-link">
          <mat-icon>dataset</mat-icon>
          Projects
        </a>
        <a
          routerLink="/contributors"
          mat-menu-item
          routerLinkActive="active-link"
        >
          <mat-icon>group</mat-icon>
          Contributeurs
        </a>
      </mat-drawer>
      <mat-drawer-content>
        <router-outlet />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: `mat-drawer-container {
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: column;
  }
  
  mat-drawer {
    width: 220px;
    border-right: 1px solid var(--mat-sys-outline-variant);
    border-radius: 0%;
  }
  
  .active-link {
    background: var(--mat-sys-outline-variant);
  }`,
})
export class SideNavComponent {}
