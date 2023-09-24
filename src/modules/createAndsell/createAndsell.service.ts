import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { assetABI, marketplaceABI, tokenABI } from 'src/common/abi/abi';
import { createNFT, createNFTCallBack, createNFTRes } from './models/models';
import { hash } from 'bcrypt';

@Injectable()
export class CreateAndsellService {
  constructor(private readonly configService: ConfigService) {}
  async createNFT(parma: createNFT): Promise<createNFTCallBack> {
    let marketplace;
    let asset;
    let token;
    let owner;
    const assetAddress = this.configService.get('AssetAddress');
    const marketplaceAddress = this.configService.get('MarketplaceAddress');
    const tokenAddress = this.configService.get('TokenAddress');

    const ownerPrivateKey = this.configService.get('OwnerPrivateKey');
    const provider = new ethers.JsonRpcProvider(this.configService.get('PRC'));
    owner = new ethers.Wallet(ownerPrivateKey, provider);
    asset = new ethers.Contract(assetAddress, assetABI, owner);
    marketplace = new ethers.Contract(
      marketplaceAddress,
      marketplaceABI,
      owner
    );
    token = new ethers.Contract(tokenAddress, tokenABI, owner);
    try {
      // 给资产上链 需要tokenId 和 address（owner 用户的地址） 获取到资产的地址
      // 调用 mint 函数，创建资产
      await asset.mint(owner.address, parma.tokenId);
      // await this.awaitTime();
      await this.awaitTime(); //等待5s，先暂时这样处理，后面再想办法改进
      // 设置授权
      await asset.approve(marketplaceAddress, parma.tokenId);

      await asset.setApprovalForAll(marketplaceAddress, owner.address);

      const res = await marketplace.createListing({
        assetContract: assetAddress,
        tokenId: parma.tokenId,
        startTime: parma.startTime,
        secondsUntilEndTime: parma.secondsUntilEndTime,
        quantityToList: parma.quantityToList,
        currencyToAccept: tokenAddress,
        reservePricePerToken: parma.currencyToAccept,
        buyoutPricePerToken: parma.buyoutPricePerToken,
        listingType: parma.listingType,
      });
      //   const listing = await marketplace.listings(0);
      return {
        code: 201,
        error: '',
        result: { hash: res.hash },
      };
    } catch (e) {
      return {
        code: 500,
        error: String(e),
        result: [],
      };
    }
  }
  awaitTime() {
    return new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
