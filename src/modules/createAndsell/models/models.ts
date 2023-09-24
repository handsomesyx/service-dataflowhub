export interface createNFT {
  tokenId: number; //id 唯一 不能重复
  startTime: number; // 开始的时间 这个不用进行修改
  secondsUntilEndTime: number; // 结束的时间 这个不用进行修改
  quantityToList: number; // 总数
  currencyToAccept: string; // 代币地址
  reservePricePerToken: BigInt; //拍卖接受的价格
  buyoutPricePerToken: BigInt; // 直接售卖的价格
  listingType: number;
  toAddress: string;
}

export interface createNFTCallBack {
  code: number;
  error: string;
  result: createNFTRes2 | [];
}

export interface createNFTRes {
  listingId: string;
  tokenOwner: string;
  assetContract: string;
  tokenId: string;
  startTime: string;
  endTime: string;
  quantity: string;
  currency: string;
  reservePricePerToken: string;
  buyoutPricePerToken: string;
  tokenType: string;
  listingType: string;
}

export interface createNFTRes2 {
  hash: string;
}
