import axios, { AxiosInstance } from "axios";
import { GetAnaloguesDto, GetGoodsDto, Good } from "../types/api.types";
import { constants } from "../constants/constants";
import { concatQueryStringFromObject } from "../utils/utils";

const instance: AxiosInstance = axios.create({
  baseURL: constants.api.base_url,
});

export class ApiService {
  static async getGoods(dto: GetGoodsDto): Promise<Array<Good>> {
    const query = concatQueryStringFromObject(dto);
    const response = await instance.get(query);
    return response.data.goods;
  }

  static async getAnalogues(dto: GetAnaloguesDto): Promise<Array<Good>> {
    const { key, brand, number } = dto;
    const response = await instance.get(
      `/?key=${key}&number=${number}&brand=${brand}&analogues=on`
    );
    return response.data.goods[0].analogues ?? [];
  }
}
