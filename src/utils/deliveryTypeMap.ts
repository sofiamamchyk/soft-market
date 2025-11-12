import {EDeliveryType} from "src/models/deliveryType.enum";

export const deliveryTypeMap: Record<EDeliveryType, string> = {
  [EDeliveryType.ADDRESS_DELIVERY]: 'Адресна доставка',
  [EDeliveryType.SELF_SERVICE]: 'Самовивіз з магазину',
  [EDeliveryType.NOVA_POSHTA]: 'Нова пошта',
};