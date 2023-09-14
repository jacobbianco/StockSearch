import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { DataComponent } from "../data/data.component";
import {CustomErrorComponent} from "../custom-error/custom-error.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'error', component: CustomErrorComponent},
  {path: 'data', component: DataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
