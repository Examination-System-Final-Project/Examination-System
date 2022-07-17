import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MasterContainerComponent } from './master-container/master-container.component';
import { FooterComponent } from './footer/footer.component';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    MasterContainerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    MasterContainerComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
