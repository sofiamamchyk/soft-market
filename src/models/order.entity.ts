import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,
  OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Item } from './item.entity';
import {EDeliveryType} from './deliveryType.enum';
import {EPaymentType} from './paymentType.enum';
import {EOrderStatus} from './orderStatus.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @CreateDateColumn()
  date: Date;

  @Column({ default: EOrderStatus.PENDING })
  status: EOrderStatus;

  @Column()
  contactName: string;

  @Column()
  contactEmail: string;

  @Column()
  contactPhone: string;

  @Column()
  deliveryType: EDeliveryType;

  @Column()
  paymentType: EPaymentType;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Item, (item) => item.order, {
    cascade: ['insert']
  })
  items: Item[];

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getContactName(): string {
    return this.contactName;
  }

  setContactName(name: string) {
    this.contactName = name;
  }

  getContactEmail(): string {
    return this.contactEmail;
  }

  setContactEmail(email: string) {
    this.contactEmail = email;
  }

  getContactPhone(): string {
    return this.contactPhone;
  }

  setContactPhone(phone: string) {
    this.contactPhone = phone;
  }

  getDeliveryType(): EDeliveryType {
    return this.deliveryType;
  }

  setDeliveryType(deliveryType: EDeliveryType) {
    this.deliveryType = deliveryType;
  }

  getPaymentType(): EPaymentType {
    return this.paymentType;
  }

  setPaymentType(paymentType: EPaymentType) {
    this.paymentType = paymentType;
  }

  getStatus(): EOrderStatus {
    return this.status;
  }

  setStatus(status: EOrderStatus) {
    this.status = status;
  }

  getTotal(): number {
    return this.total;
  }

  setTotal(total: number) {
    this.total = total;
  }

  getDate(): string {
    return this.date.toISOString().split('T')[0];
  }

  setDate(date: Date) {
    this.date = date;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  getItems(): Item[] {
    return this.items;
  }

  setItems(items: Item[]) {
    this.items = items;
  }
}
