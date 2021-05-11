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
  xAxisData = ['2020Q2', '2020Q3', '2020Q4', '2021Q1', '2021Q2'];
  fullCap = [ 20, 140, 200, 300, 350];
  depositedCap = [ this.vaultBalance || 0];
  options: any;
  vaultView = 'info';
  operationValue: any;
  transactions = [
    {
      address: '0x004',
      value: 20,
      txType: 'deposit'
    },
    {
      address: '0x001',
      value: 100,
      txType: 'withdraw'
    },
    {
      address: '0x002',
      value: 20,
      txType: 'deposit'
    },
    {
      address: '0x003',
      value: 50,
      txType: 'withdraw'
    },
    {
      address: '0x001',
      value: 200,
      txType: 'deposit'
    },
    {
      address: '0x004',
      value: 20,
      txType: 'deposit'
    },
    {
      address: '0x001',
      value: 100,
      txType: 'withdraw'
    },
    {
      address: '0x002',
      value: 20,
      txType: 'deposit'
    },
    {
      address: '0x003',
      value: 50,
      txType: 'withdraw'
    },
    {
      address: '0x001',
      value: 200,
      txType: 'deposit'
    }
  ]

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
    this.xAxisData = ['2020Q2', '2020Q3', '2020Q4', '2021Q1', '2021Q2'];
    this.fullCap = [ 20, 140, 200, 300, 350 + this.vaultBalance];
    this.depositedCap = [ 0, 0, 0, 0, this.vaultBalance || 0];

    this.options = {
      legend: {
        data: ['Full Cap.','Your Cap.'],
        align: 'right',
      },
      tooltip: {},
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'Full Cap.',
          type: 'bar',
          data: this.fullCap
        },
        {
          name: 'Your Cap.',
          type: 'bar',
          data: this.depositedCap
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
