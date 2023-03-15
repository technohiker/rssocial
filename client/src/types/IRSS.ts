export interface IRSSFeed {
  _version: string; //Assumes version 2.0
  channel: {
    image: {
      url: string;
      title: string;
    };
    item: IRSSItem[];
    title: string;
  };
}

export interface IRSSItem {
  creator: {
    __text: string;
  };
  description: string;
  guid: {
    _isPermaLink: string;
    __text: string; //Holds URL that does not have any additional parameters, such as utm_campaign.
  };
  link: string;
  pubDate: string; //Returning datetime.  Would that work, or is it being stringified by x2js?

  thumbnail: {
    _url: string;
    width: number;
    __prefix: string;
  };
  title: string;
}
