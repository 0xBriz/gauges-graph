import { Address, BigInt, dataSource } from '@graphprotocol/graph-ts';

export const ZERO = BigInt.fromI32(0);
export const ONE = BigInt.fromI32(1);
export const ZERO_BD = ZERO.toBigDecimal();
export const ONE_BD = ZERO.toBigDecimal();

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export class AddressByNetwork {
  public mainnet: string;
  public kovan: string;
  public goerli: string;
  public bsc: string;
}

let network: string = dataSource.network();

let controllerAddressByNetwork: AddressByNetwork = {
  mainnet: '0x585ECE7932226CCf5A259c367781F07EBBB1950F',
  kovan: '0x28bE1a58A534B281c3A22df28d3720323bfF331D',
  goerli: '0xCf4d79044BE5d593E3883fdc6fBe751Ce6a9Ec08',
  bsc: '0x585ECE7932226CCf5A259c367781F07EBBB1950F'
};

function forNetwork(
  addressByNetwork: AddressByNetwork,
  network: string,
): Address {
  if (network == 'mainnet') {
    return Address.fromString(addressByNetwork.mainnet);
  } else if (network == 'kovan') {
    return Address.fromString(addressByNetwork.kovan);
  } else if(network == 'goerli') {
    return Address.fromString(addressByNetwork.goerli);
  } else {
    return Address.fromString(addressByNetwork.bsc);
  }
}

export const CONTROLLER_ADDRESS = forNetwork(
  controllerAddressByNetwork,
  network,
);

export const ARBITRUM_ROOT_GAUGE_FACTORY = Address.fromString(
  '0xad901309d9e9DbC5Df19c84f729f429F0189a633',
);
