import { Injectable } from "@angular/core";
import { vaultsData } from '../data/vaults.data';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})

export class DemoService {

  wallet: any;
  vaults: any;

  constructor(
    private sharedService: SharedService
  ) { }

  createLocalData(){
    this.vaults = vaultsData
    localStorage.setItem('vaults', JSON.stringify(this.vaults));
    console.log('DEMO: vaults created')
  }

  getVaults() {
    this.vaults = localStorage.getItem('vaults');
    this.vaults = JSON.parse(this.vaults);
    return this.vaults;
  }

  getVaultById(vaultId: string) {
    this.vaults = localStorage.getItem('vaults');
    this.vaults = JSON.parse(this.vaults)
    let vault = this.vaults.find((vault: any) => vault.id === vaultId); 
    return vault;
  }

  connectWalletDemo() {
    this.wallet = {
      address: '0x005',
      assets: [{
        coin: 'eth',
        balance: 100.0000
      }, {
        coin: 'dai',
        balance: 500000.0000
      }]
    }
    localStorage.setItem('wallet', JSON.stringify(this.wallet));
    console.log('DEMO: wallet created')
  }

  refreshWalletDemo() {
    this.wallet = localStorage.getItem('wallet');
    this.wallet = JSON.parse(this.wallet)
    return this.wallet;
  }

  deposit(vaultId: string, value: number) {
    this.wallet = localStorage.getItem('wallet');
    this.wallet = JSON.parse(this.wallet);
    let vaults = this.getVaults();
    if (vaultId = 'eth') {
      let walletBalance = this.wallet.assets[0].balance;
      if (value < walletBalance) {
        this.wallet.assets[0].balance = walletBalance - value;
        localStorage.setItem('wallet', JSON.stringify(this.wallet));
        vaults[0].balance = vaults[0].balance + value;
        if (vaults[0].holders.length < 5){
          const newItem = new Array({
            name: this.wallet.address,
            value: value
          });
          Array.prototype.push.apply(vaults[0].holders,newItem);
        } else {
          vaults[0].holders[4].value = vaults[0].holders[4].value + value;
        }
        console.log(vaults[0].holders);
        vaults[0].txs = vaults[0].txs + 1;
        localStorage.setItem('vaults', JSON.stringify(this.vaults));
        console.log('DEMO: deposit success');
        return true
      } else {
        alert('insuficient funds')
        return false
      }
    } else {
      let walletBalance = this.wallet.assets[1].balance;
      if (value < walletBalance) {
        this.wallet.assets[1].balance = walletBalance - value;
        localStorage.setItem('wallet', JSON.stringify(this.wallet));
        vaults[1].balance = vaults[1].balance + value;
        if (vaults[1].holders.length < 5){
          const newItem = new Array({
            name: this.wallet.address,
            value: value
          });
          Array.prototype.push.apply(vaults[1].holders,newItem);
        } else {
          vaults[1].holders[4].value = vaults[1].holders[4].value + value;
        }
        console.log(vaults[1].holders);
        vaults[1].txs = vaults[1].txs + 1;
        localStorage.setItem('vaults', JSON.stringify(this.vaults));
        console.log('DEMO: deposit success');
        return true
      } else {
        alert('insuficient funds')
        return false
      }
    }
  }

  withdraw(vaultId: string, value: number) {
    this.wallet = localStorage.getItem('wallet');
    this.wallet = JSON.parse(this.wallet);
    let vaults = this.getVaults();
    if (vaultId = 'eth') {
      let vaultBalance = vaults[0].holders[4].value;
      if (value <= vaultBalance) {
        this.wallet.assets[0].balance = this.wallet.assets[0].balance + value;
        localStorage.setItem('wallet', JSON.stringify(this.wallet));
        vaults[0].balance = vaults[0].balance - value;
        vaults[0].holders[4].value = vaults[0].holders[4].value - value;
        vaults[0].txs = vaults[0].txs + 1;
        localStorage.setItem('vaults', JSON.stringify(this.vaults));
        console.log('DEMO: withdraw success');
        return true
      } else {
        alert('insuficient funds')
        return false
      }
    } else {
      let vaultBalance = vaults[1].holders[4].value;
      if (value <= vaultBalance) {
        this.wallet.assets[1].balance = this.wallet.assets[1].balance + value;
        localStorage.setItem('wallet', JSON.stringify(this.wallet));
        vaults[1].balance = vaults[1].balance - value;
        vaults[1].holders[4].value = vaults[1].holders[4].value - value;
        vaults[1].txs = vaults[1].txs + 1;
        localStorage.setItem('vaults', JSON.stringify(this.vaults));
        console.log('DEMO: withdraw success');
        return true
      } else {
        alert('insuficient funds')
        return false
      }
    }
  }

  calculate() {}

}
