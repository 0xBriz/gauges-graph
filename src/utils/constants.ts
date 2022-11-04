import { Address, BigInt, dataSource } from '@graphprotocol/graph-ts';

export const ZERO = BigInt.fromI32(0);
export const ONE = BigInt.fromI32(1);
export const ZERO_BD = ZERO.toBigDecimal();
export const ONE_BD = ZERO.toBigDecimal();

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export class AddressByNetwork {
  public mainnet: string;
  public goerli: string;
  public bsc: string;
}

let network: string = dataSource.network();

let controllerAddressByNetwork: AddressByNetwork = {
  mainnet: '0x585ECE7932226CCf5A259c367781F07EBBB1950F',
  goerli: '0xCf4d79044BE5d593E3883fdc6fBe751Ce6a9Ec08',
  bsc: '0x585ECE7932226CCf5A259c367781F07EBBB1950F',
};

function forNetwork(
  addressByNetwork: AddressByNetwork,
  network: string,
): Address {
  if (network == 'mainnet') {
    return Address.fromString(addressByNetwork.mainnet);
  } else if (network == 'goerli') {
    return Address.fromString(addressByNetwork.goerli);
  } else {
    return Address.fromString(addressByNetwork.bsc);
  }
}

export const CONTROLLER_ADDRESS = forNetwork(
  controllerAddressByNetwork,
  network,
);
export const VAULT_ADDRESS = Address.fromString(
  '0xEE1c8DbfBf958484c6a4571F5FB7b99B74A54AA7',
);
