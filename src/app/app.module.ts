import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaultComponent } from './pages/vault/vault.component';
import { DepositComponent } from './pages/operations/deposit/deposit.component';
import { WithdrawComponent } from './pages/operations/withdraw/withdraw.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LandingComponent } from './pages/landing/landing.component';
import { BlockchainService } from './services/blockchain.service';

@NgModule({
  declarations: [
    AppComponent,
    VaultComponent,
    DepositComponent,
    WithdrawComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    BlockchainService,
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
