import { IMessage } from "./IMessage";

export interface IRSSFeed {
  _version: string; //Assumes version 2.0
  channel: {
    image: {
      url: string;
      title: string;
    };
    item: IMessage[];
    title: string;
  };
}

export interface IRSSItem {
  creator: {
    __text: string;
  };  //Optional, but common.
  description: string;
  guid: {
    _isPermaLink: string;
    __text: string; //Holds URL that does not have any additional parameters, such as utm_campaign.
  };
  pubDate: string; //Returning datetime.  Would that work, or is it being stringified by x2js?

  thumbnail: {
    _url: string;
    width: number;
    __prefix: string;
  };  //Seems to be exclusive to Oakland Patch and Lifehacker.
  //Parse JSON for the text 'text/jpeg' or 'text/png', and return the text it appears in?
  title: string;
}