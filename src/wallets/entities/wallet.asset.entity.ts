import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";
import mongoose from "mongoose";
import crypto from 'node:crypto'
import { type WalletDocument } from "./wallet.entity";
import { Asset, type AssetDocument } from "src/assets/entities/asset.entity";



export type WalletAssetDocument = HydratedDocument<WalletAsset> 


@Schema({
  timestamps: true
})

export class WalletAsset {
  @Prop({ default: () => crypto.randomUUID()})
  _id: string 
  
  @Prop({type: mongoose.Schema.Types.Int32})
  shares: number

  @Prop({ type: String, ref: 'Wallet'})
  wallet: WalletDocument | string;
  
  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  createdAt!: Date

  updatedAt!: Date
}


export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset)

WalletAssetSchema.index({ Wallet: 1, Asset: 1 }, { unique: true })