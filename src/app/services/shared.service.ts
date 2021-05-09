import { Injectable } from '@angular/core';
import { Wallet } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { Vault } from '../models/vault.model';
import { vaultsData } from '../data/vaults.data';
//import { Wallet } from '../models/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private walletSource = new BehaviorSubject({});
  currentWallet = this.walletSource.asObservable();
  
  updateWallet(wallet: any) {
    this.walletSource.next(wallet);
  }

  private vaultSource = new BehaviorSubject(vaultsData);
  vaultStatus = this.vaultSource.asObservable();
  
  updateVault(vault: any) {
    this.vaultSource.next(vault);
  }

}
