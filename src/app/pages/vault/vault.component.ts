import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { vaultsData } from '../../data/vaults.data';
import { holdersData } from '../../data/holders.data';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})

export class VaultComponent implements OnInit {

  wallet: any;
  walletBalance: any;
  vault: any;
  vaultBalance = 0;
  selectedOperation!: string;
  step: any;
  depositForm: FormGroup;
  withdrawForm: FormGroup;
  calculateForm: FormGroup;
  holdersGraphSource = holdersData;
  holdersNumber: number;
  options: any;
  vaultView = 'info';
  operationValue: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demoService: DemoService, 
    private formBuilder: FormBuilder,
    private sharedData: SharedService,
    //private metamaskService: MetamaskService
  ) {
    this.wallet = this.demoService.refreshWalletDemo();
    let vaultId = this.route.snapshot.paramMap.get('id');
    this.vault = this.demoService.getVaultById(vaultId!);
    console.log(this.vault)
    if (vaultId == 'eth') {
      this.walletBalance = this.wallet.assets[0].balance;
      if (this.vault.holders[4]){
        this.vaultBalance = this.vault.holders[4].value;
      }
    } else {
      this.walletBalance = this.wallet.assets[1].balance;
      if (this.vault.holders[4]){
        this.vaultBalance = this.vault.holders[4].value;
      }
    }
    this.holdersNumber = this.vault.holders.length;
    this.depositForm = this.formBuilder.group({
      valueApprove: ['']
    });
    this.withdrawForm = this.formBuilder.group({
      valueApprove: ['']
    });
    this.calculateForm = this.formBuilder.group({
      value: ['', Validators.required, Validators.pattern("^[0-9]*$")],
      time: [365, Validators.required],
      estimatedPrice: [3000]
    });
  }

  ngOnInit(): void {
    this.selectedOperation = 'menu';
    this.step = 1;
    this.initHoldersGraph();
    this.initBalanceGraph();
  }

  initHoldersGraph(){
    this.holdersGraphSource = holdersData
    //set this.holdersGraphSource.legend
    console.log(this.vault.holders)
    this.holdersGraphSource.series[0].data = this.vault.holders
  }

  initBalanceGraph(){
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push(i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['balance', 'apy'],
        align: 'right',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'balance',
          type: 'bar',
          data: data1
        },
        {
          name: 'apy',
          type: 'bar',
          data: data2
        },
      ],
      animationEasing: 'elasticOut'
     
    };
  }

  changeView(view: string) {
    this.vaultView = view;
  }

  selectOperation(operation: string) {
    this.step = 1;
    this.selectedOperation = operation;
  }
  
  async submitOperation(){
    this.step = 2;
    if(this.selectedOperation == 'deposit'){
      this.operationValue = this.depositForm.controls.valueApprove.value;
      this.depositForm.disable()
    } else {
      this.operationValue = this.withdrawForm.controls.valueApprove.value;
      this.withdrawForm.disable()
    }
  }

  async confirmOperation(){
    this.step = 3;
    setTimeout(op => {if(this.selectedOperation == 'deposit'){
      let operation = this.demoService.deposit(this.vault.id, this.operationValue)
      console.log(operation)
      if(operation){
        this.step = 4;
      } else {
        this.step = 5;
      }
    } else {
      let operation = this.demoService.withdraw(this.vault.id, this.operationValue)
      if(operation){
        this.step = 4;
      } else {
        this.step = 5;
      }
    }}, 5000);
  }

 refreshWallet(){
  window.location.reload();
 }

}
