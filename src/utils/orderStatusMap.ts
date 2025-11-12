import {EOrderStatus} from "src/models/orderStatus.enum";

export const orderStatusMap: Record<EOrderStatus, string> = {
  [EOrderStatus.PENDING]: 'В очікуванні',
  [EOrderStatus.ACCEPTED]: 'Прийнято',
  [EOrderStatus.PROCESSING]: 'Комплектується',
  [EOrderStatus.AWAITING_DELIVERY]: 'Очікує на доставку',
  [EOrderStatus.SENT]: 'Відправлено',
  [EOrderStatus.READY_TO_ISSUE]: 'Готове до видачі',
  [EOrderStatus.DONE]: 'Виконано',
};