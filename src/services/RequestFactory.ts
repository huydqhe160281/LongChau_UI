import AuthRequest from './AuthRequest';
import MarketDataRequest from './MarketDataRequest';
import TradeRequest from './TradeRequest';

const requestMap = {
  AuthRequest,
  MarketDataRequest,
  TradeRequest,
};

const instances = {};

export default class RequestFactory {
  static getRequest(classname: string) {
    // @ts-ignore
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    // @ts-ignore
    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      // @ts-ignore
      instances[classname] = requestInstance;
    }

    return requestInstance;
  }
}