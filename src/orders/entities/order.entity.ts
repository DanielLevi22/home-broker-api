import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";
import mongoose from "mongoose";
import crypto from 'node:crypto'
import { Asset, type AssetDocument } from "src/assets/entities/asset.entity";
import { Wallet, type WalletDocument } from "src/wallets/entities/wallet.entity";



export type OrderDocument = HydratedDocument<Order> 

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL'
}


export enum OrderStatus {
  PENDING = "PENDING",
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  FAILED = "FAILED"
}



@Schema({
  timestamps: true
})

export class Order {
  @Prop({ default: () => crypto.randomUUID()})
  _id: string 
  
  @Prop({type: mongoose.Schema.Types.Int32})
  shares: number

  @Prop()
  partial: number


  @Prop({type: mongoose.Schema.Types.Int32})
  price: number

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;
  
  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop()
  type: OrderType

  @Prop()
  status: OrderStatus

  createdAt!: Date

  updatedAt!: Date
}


export const OrderSchema = SchemaFactory.createForClass(Order)

