import {GuitarType, StringsCount} from './common';

export class ProductDto {
  public id!: string;
  public createdAt!: string;
  public authorId!: string;
  public title!: string;
  public description!: string;
  public image!: string;
  public guitarType!: GuitarType;
  public sku!: string;
  public stringsCount!: StringsCount;
  public rating!: number;
  public price!: number;
  public reviewsCount!: number;
}
