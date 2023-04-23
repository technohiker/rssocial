export interface ICall {
  id: number,
  feed_id?: number,
  base_url: string,
  source_name?: string;
  request_body?: string,
  request_params?: string,
  request_headers?: string
}