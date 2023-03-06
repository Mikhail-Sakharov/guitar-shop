import {GuitarType, StringsCount} from './common';

export default class CreateProductDto {
  public createdAt?: string;
  public title!: string;
  public description!: string;
  public image!: string;
  public guitarType!: GuitarType;
  public sku!: string;
  public stringsCount!: StringsCount;
  public price!: number;
}
