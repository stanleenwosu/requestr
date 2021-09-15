import { Injectable } from '@angular/core';
import { PurchaseOrder } from 'app/@core/data/order';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  colPath = 'purchase-orders'
  constructor(
    private fireS: FirebaseService
  ) { }

  createPurchaseOrder(order: PurchaseOrder) {
    console.log(order)
    return this.fireS.addDoc(this.colPath, order)
  }

  getPurchaseOrder(id: string) {
    return this.fireS.getDoc(this.colPath, id) as Promise<PurchaseOrder>
  }

  getPurchaseOrders() {
    return this.fireS.getColWithLimit(this.colPath, 10) as Promise<PurchaseOrder[]>
  }

  paginatePurchaseOrders(lastId: string) {
    return this.fireS.paginateCol(this.colPath, 10, lastId) as Promise<PurchaseOrder[]>
  }
}
