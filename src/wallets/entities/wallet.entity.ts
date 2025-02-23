import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";
import mongoose from "mongoose";
import crypto from 'node:crypto'
import { WalletAsset } from "./wallet.asset.entity";



export type WalletDocument = HydratedDocument<Wallet> 


@Schema({
  timestamps: true
})

export class Wallet {
  @Prop({ default: () => crypto.randomUUID()})
  _id: string 


  @Prop({
    type: mongoose.Schema.Types.String,
    set: (v) => [... new Set(v)],
    ref: WalletAsset.name
  })
  assets: WalletDocument[] | string[];

  createdAt!: Date

  updatedAt!: Date
}


export const WalletSchema = SchemaFactory.createForClass(Wallet)