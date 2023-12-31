import prod from './prod.json';
import dev from './dev.json';
import staging from './staging.json';

export interface BlockExplorer {
  name: string;
  icon: string;
  url: string;
}

export interface Connector {
  id: string;
  name: string;
  icon: string;
  disableIcon: string;
  description: string;
  href: string;
  mobile: boolean;
  deepLink: string;
  options: any;
  extensionLink?: {
    chrome: string;
    firefox: string;
    brave: string;
    edge: string;
  };
}

export interface Currency {
  id: string;
  coingeckoId: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
}

export interface Network {
  id: string;
  coingeckoId: string;
  name: string;
  chainId: number;
  rpcUrls: string[];
  blockExplorer: BlockExplorer;
  addresses?: any;
  connectors: { [key: string]: Connector };
  icon?: string;
  iconURL?: string;
  disableIcon?: string;
  currency?: string;
  nativeCurrency?: any;
  currencies: { [key: string]: Currency };
  networkFamily?: string;
  tokenBytecode?: string;
}

interface Config {
  auth: {
    domain: string;
    message: string;
    googleClientId: string;
  };
  api: {
    baseUrlApi: string;
  };
  networks: { [key: string]: Network };
}

const env = process.env.REACT_APP_ENV || 'dev';
const configs: any = { prod, dev, staging };
const config: Config = configs[env];

export default config;
