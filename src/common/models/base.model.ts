export abstract class BaseModel {
  //主键
  id: number | bigint | string;

  is_delete: boolean | null;
}
