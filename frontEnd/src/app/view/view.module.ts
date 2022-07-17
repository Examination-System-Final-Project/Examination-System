import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { LayoutModule } from './layout/layout.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CountdownModule,
    MatDialogModule
  ],
  exports:[ViewComponent]
})
export class ViewModule { }
