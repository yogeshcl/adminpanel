import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { DragdropComponent } from './dragdrop.component';

import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DragdropComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
      NgbModule,
      MatButtonModule,
      MatInputModule,
      MatSnackBarModule,
  ]
})
export class ManagetrendsModule { }
