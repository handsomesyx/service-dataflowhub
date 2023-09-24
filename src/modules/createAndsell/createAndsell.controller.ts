import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateAndsellService } from './createAndsell.service';
import { ethers } from 'ethers';
import { assetABI, marketplaceABI, tokenABI } from 'src/common/abi/abi';
import { log } from 'winston';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { createNFT, createNFTCallBack, createNFTRes } from './models/models';
@Controller('v1/create-and-sell')
export class CreateAndsellController {
  constructor(
    private readonly createAndsellService: CreateAndsellService,
    private readonly configService: ConfigService
  ) {}

  @Post('createNFT')
  async createNFT(@Body() body: any): Promise<createNFTCallBack> {
    const { data } = body;
    if (!data) {
      return {
        code: 422,
        error: 'data should be sumbited',
        result: [],
      };
    }
    const parma = {
      tokenId: data.tokenId, //id 唯一 不能重复
      startTime: Math.floor(Date.now() / 1000) + 3600, // 开始的时间 这个不用进行修改
      secondsUntilEndTime: 3600, // 结束的时间 这个不用进行修改
      quantityToList: data.quantityToList, // 总数
      currencyToAccept: data.currencyToAccept, // 代币地址
      reservePricePerToken: BigInt(data.reservePricePerToken), //拍卖接受的价格
      buyoutPricePerToken: BigInt(data.buyoutPricePerToken), // 直接售卖的价格
      listingType: data.listingType, // 或者使用常量 Direct  0是直接售卖 1是拍卖
      toAddress: data.toAddress,
    };
    const res = await this.createAndsellService.createNFT(parma);
    return res;
  }
}
