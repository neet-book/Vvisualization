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

/**
 * 以天为单位数据
 * @property date - 日期
 * @property today - 今日的数据
 * @property total - 总数据
 * @property lastUpdateTime - 上次更新时间
 */
declare interface DayCount {
  date: string,
  today: TotalDate,
  total: TotalDate,
  lastUpdateTime: null | string
}

/**
 * @property id - id
 * @property lastUpdateTime - 上次更新时间
 * @property children - 子区域数据
 * @property total - 今日数据
 * @property today - 总数据
 */
declare interface AreaDate {
  id: number,
  lastUpdateTime: string,
  children: AreaDate[],
  total: TotalDate,
  today: TotalDate
}
