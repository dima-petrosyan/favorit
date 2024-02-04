export interface Good {
  goodsID: string; // - Идентификатор товара
  brand: string; // - Производитель
  number: string; // - Номер детали
  name: string; // - Наименование детали
  count: number; // - Остаток на всех складах
  price: number; // - НЕ ИСПОЛЬЗОВАТЬ, цену нужно брать из конкретного склада, этот реквизит остался для совместимости
  rate: number; // - Кратность
  analogues: Array<Good>; // - Массив с аналогами (с параметрами как в goods)
  warehouses: Array<Warehouse>; // - Массив складов на которых имеется товар
  notRefund: boolean; // - Невозвратная позиция
}

export interface Warehouse {
  code: string; // - Сокращенное наименование склада (имеется не у все складов)
  id: string; // - Внутренний идентификатор склада
  own: boolean; // - Товар находиться на нашем складе
  shipmentDate: number; // - Поле содержит Дату и Время
  price: number; // - Цена
  stock: number; // - Остаток на этом складе
  notRefund: boolean; // - Невозвратная позиция
}

export type ApiError =
  | "Empty key!"
  | "Invalid key client!"
  | "Empty number goods!"
  | "Request quota exceeded!";

export const ErrorCase: Record<ApiError, string> = {
  "Empty key!": "Не указан ключ покупателя",
  "Invalid key client!": "Неверный ключ покупателя, покупатель не найден",
  "Empty number goods!": "Не указан номер детали",
  "Request quota exceeded!":
    "Вы превысили лимит запросов по грузовому ассортименту",
};

export interface GetGoodsDto {
  key: string; // - Уникальный ключ покупателя
  number: string; // - Номер детали
  brand?: string; // - Производитель (не обязательный параметр)
  analogues?: "on" | undefined; // - Если указать значение «on» и заполнить параметр brand – будут возвращаться аналоги детали (не обязательный параметр)
  info?: "on" | undefined; // - Если указать значение «on», то в ответе будет признак невозвратных позиций
}

export interface GetAnaloguesDto {
  key: string;
  brand: string;
  number: string;
}
