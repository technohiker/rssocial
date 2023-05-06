export interface IRedditResponse {
  kind: string,
  data: {
    modhash: string | null,
    dist: number,
    children: [{
      kind: string,
      data: IRedditPost
    }]
    after: string | null,
    before: string | null,
    geo_filter: string | null
  }
  feed: IRedditPost[]
}

export interface IRedditPost {
  selftext: string,
  title: string,
  score: number,
  author: string,
  created_utc: number, //Unix timestamp, must convert.
  permalink: string,
  subreddit: string

}