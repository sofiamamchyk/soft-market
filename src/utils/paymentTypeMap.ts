import {EPaymentType} from "src/models/paymentType.enum";

export const paymentTypeMap: Record<EPaymentType, string> = {
  [EPaymentType.ONLINE_CARD]: 'Оплата картою онлайн',
  [EPaymentType.UPON_RECEIPT]: 'Оплата при отриманні',
};