import BaseRequest from './BaseRequest';
import config from 'src/config';

export default class OrderRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getCreatedOrder() {
    const url = `order/created-orders`;
    return this.get(url);
  }

  getApprovedOrder() {
    const url = `order/approved-orders`;
    return this.get(url);
  }

  getDeliveredOrder() {
    const url = `order/delivered-orders`;
    return this.get(url);
  }

  getDoneOrder() {
    const url = `order/done-orders`;
    return this.get(url);
  }

  getRejectedOrder() {
    const url = `order/rejected-orders`;
    return this.get(url);
  }

  getOrderById(id: number) {
    const url = `order/${id}`;
    return this.get(url);
  }

  changeStatusOrder(id: number, param: any) {
    const url = `order/${id}`;
    return this.put(url, param);
  }
}
