import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRouterModule } from './view/layout/layout-router.module';
import { ViewComponent } from './view/view/view.component';
import { MasterContainerComponent } from './view/layout/master-container/master-container.component';
const router: Routes = [
  {
    path: '', component: ViewComponent, children:
      [
        { path: '', component: MasterContainerComponent, children: [...LayoutRouterModule] }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
