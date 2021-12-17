import Web3 from "web3"
import {Contract, CallOptions, SendOptions} from "web3-eth-contract"
import {PromiEvent} from "web3-core";
import BigNumber from "bignumber.js";

class AContract {
  web3: Web3;
  abi: any[];
  contract: Contract;

  constructor(web3Instance: Web3, abi: any[], address: string){
    this.web3 = web3Instance;
    this.abi = abi;
    this.contract = new this.web3.eth.Contract(this.abi, address)
  }

  name(options?: CallOptions): Promise<string> {
    return this.contract.methods.name().call(options);
  }
  
  approve(_spender: string, _value: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.approve(
      _spender,
      _value
    ).send(options);
  }
  
  totalSupply(options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.totalSupply().call(options);
  }
  
  transferFrom(_from: string, _to: string, _value: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.transferFrom(
      _from,
      _to,
      _value
    ).send(options);
  }
  
  decimals(options?: CallOptions): Promise<number | string | BigNumber> {
    return this.contract.methods.decimals().call(options);
  }
  
  balanceOf(_owner: string, options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.balanceOf(
      _owner
    ).call(options);
  }
  
  symbol(options?: CallOptions): Promise<string> {
    return this.contract.methods.symbol().call(options);
  }
  
  transfer(_to: string, _value: string | BigNumber, options?: SendOptions): PromiEvent<Contract> {
    return this.contract.methods.transfer(
      _to,
      _value
    ).send(options);
  }
  
  allowance(_owner: string, _spender: string, options?: CallOptions): Promise<string | BigNumber> {
    return this.contract.methods.allowance(
      _owner,
      _spender
    ).call(options);
  }
  
}