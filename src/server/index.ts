import axios from "axios";

const server = axios.create({
  baseURL: 'http://localhost:2024'
})

/**
 * 列表结果
 * @property chinaTotal - 国内总数据
 * @property chinaDayList - 国内每天总数据列表
 * @property areaTree - 各地区数据列表
 * @property lastUpdateTime - 上次更新时间
 * @property overseaLastUpdateTime - 其他机构更新时间
 */
interface ListResult {
  chinaTotal: { today: TotalDate, total: TotalDate }
  chinaDayList: {

  }
  areaTree: AreaDate[]
  lastUpdateTime: string | null
  overseaLastUpdateTime: string | null
}

export function getList(): Promise<ListResult> {
  return server.get('/api/list').then(resp => resp.data)
}