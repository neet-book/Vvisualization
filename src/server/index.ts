import axios from "axios";

const server = axios.create({
  baseURL: 'http://localhost:2024'
})

interface Result<T> {
  reqId: number
  code: number
  msg: string
  data: T
}



export function getList() {
  return server.get<Result<CountData>>('/api/list').then(resp => resp.data)
}