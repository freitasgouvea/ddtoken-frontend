import { Injectable } from "@angular/core";
import { ethers, Signer } from "ethers";
import { throwError } from "rxjs";
import { SharedService } from "./shared.service";
//import { Wallet } from '../models/wallet.model';

@Injectable({
  providedIn: 'root'
})

export class BlockchainService {

  tokenAddress = 'any';
  vaultEthAddress = 'any';
  vaultDaiAddress = 'any';

  infuraKey = 'any';

  providerStatus: any;
  providerSigner: any;

  signer: any;
  accountAddress: any;
  wallet: any;

  abiToken: any;
  erc20: any;

  abiVault: any;
  vaultEthContract: any;
  vaultDaiContract: any;

  constructor(
    private window: Window,
    private sharedData: SharedService 
  ) { 
    //this.sharedData.currentWallet.subscribe(wallet => this.wallet = wallet);
    //this.providerStatus = ethers.getDefaultProvider('rinkeby', {infura: this.infuraKey});
    //this.erc20 = new ethers.Contract(this.tokenAddress, this.abiToken, this.providerStatus);
    //this.vaultEthContract = new ethers.Contract(this.vaultEthAddress, this.abiVault, this.providerStatus);
    //this.vaultDaiContract = new ethers.Contract(this.vaultDaiAddress, this.abiVault, this.providerStatus);
  }

  async connectWallet() {
    this.providerSigner = new ethers.providers.Web3Provider(window['ethereum']);
    console.log(this.providerSigner);
    this.signer = this.providerSigner.getSigner();
    console.log(this.signer);
    var connect = this.signer.connect(this.providerSigner);
    this.accountAddress = this.signer.getAddress();
    if(this.accountAddress){
      //await this.getBalances();
      return this.accountAddress;
    } else { 
      throwError('fail')
    }
  }

  async getBalances(){
    // var obj {}
    const ethBalance = await this.signer.getBalance();
    const daiBalance = await this.erc20.balanceOf(this.accountAddress);
    const ethVaultBalance = await this.vaultEthContract.balanceOf(this.accountAddress);
    const daiVaultBalance = await this.vaultDaiContract.balanceOf(this.accountAddress);
    this.wallet = {
      'address': this.accountAddress,
      'assets':[{
        'eth': ethBalance,
        'dai': daiBalance
      }]
    }
  }

  getEthBalance(){
    return this.signer.getBalance();
  }

  getDaiBalance(){
    return this.erc20.balanceOf(this.accountAddress);
  }

  getEthVaultBalance(){
    return this.vaultEthContract.balanceOf(this.accountAddress);
  }

  getDaiVaultBalance(){
    return this.vaultDaiContract.balanceOf(this.accountAddress);
  }

}
