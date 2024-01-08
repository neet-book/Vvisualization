/**
 *  总数据
 *  @typedef
 *  @property input - 境外输入数
 *  @property confirm - 确诊数
 *  @property suspect - 疑似病例数
 *  @property heal - 治愈数
 *  @property dead - 死亡数
 *  @property severe - 重症数
 *  @property storeConfirm? - 新增确诊
 */
declare interface TotalDate {
  input: number | null;
  confirm: number | null;
  suspect: number | null;
  heal: number | null;
  dead: number | null;
  severe: number | null;
  storeConfirm?: number | null;
}

interface AreaDate {
  id: number,
  lastUpdateTime: string,
  children: AreaDate[],
  total: TotalDate,
  today: TotalDate
}