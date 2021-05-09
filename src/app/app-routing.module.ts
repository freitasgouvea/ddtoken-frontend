import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { VaultComponent } from './pages/vault/vault.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'vault/:id', component: VaultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
