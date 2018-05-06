import * as Web3 from 'web3';
import {Injectable} from "@angular/core";

declare let require: any;
let mietAbi = require('./mietContract.json');

@Injectable()
export class SmartcontractService {

  private _web3: any;
  private _mietContract: any;
  private _mietContractAddress: string = "0x4e325be0cd35bf66a4c065f09e5177d804408529";

  constructor() {

    this._web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    this._mietContract = this._web3.eth.contract(mietAbi).at(this._mietContractAddress);
    this._web3.eth.defaultAccount = this._web3.eth.accounts[0];

  }

  addInteressent(name: string) {
    //Lisa, Anna, Mark
    this._web3.eth.defaultAccount = this.getNamedAccount(name);
    this._mietContract.interesseBekundigen({from: this._web3.eth.defaultAccount, gas:3000000},
      function(err, res) {
        console.log(res);
      });

    return this.hasBetriebung(this._web3.eth.defaultAccount);
  }

  selectInteressent(name: string) {
    //Lisa, Anna, Mark
    this._web3.eth.defaultAccount = this._web3.eth.accounts[0];
    this._mietContract.mieterSelektieren(this.getNamedAccount(name));
  }

  signContract(name: string, kaution: number) {
    this._web3.eth.defaultAccount = this.getNamedAccount(name);
    this._mietContract.vertragUnterschreiben({from: this._web3.eth.defaultAccount, gas:3000000, value: kaution});
  }

  getContractStatus() {
    this._web3.eth.defaultAccount = this._web3.eth.accounts[0];
    var status = this._mietContract.getContractStatus();
    console.log("Status ist: " + status);
    return status;
  }

  hasBetriebung(address: string) {
    let list: Array<string> = this._mietContract.getAngenommenAddressen();
    console.log(address + "in array: " + list);
    if(list.indexOf(address) > -1) {
      return false;
    }
    return true;
  }

  getNamedAccount(name: string) {
    switch(name.toLowerCase()) {
      case "lisa":
        return this._web3.eth.accounts[5];
      case "anna":
        return this._web3.eth.accounts[6];
      case "mark":
        return this._web3.eth.accounts[7];
      default:
        return this._web3.eth.accounts[0];
    }
  }

  getNameByAccount(acc: string) {
    switch (acc) {
      case this._web3.eth.accounts[5]:
        return "Lisa";
      case this._web3.eth.accounts[6]:
        return "Anna";
      case this._web3.eth.accounts[7]:
        return "Mark";
      default:
        return "MyHomegate AG";
    }
  }



  getInteressentenAdresseByName(name: string) {

  }

  // var instructorEvent = Coursetro.Instructor();
  // instructorEvent.watch(function(error, result){
  //   if (!error)
  //   {
  //     $("#loader").hide();
  //     $("#instructor").html(result.args.name + ' (' + result.args.age + ' years old)');
  //   } else {
  //     $("#loader").hide();
  //     console.log(error);
  //   }
  // });

}
