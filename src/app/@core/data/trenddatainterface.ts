export interface Trends {
            _id: string,
            hashtag: string;
  }

export interface Updatetrend{
            _id :string;
}

export interface Hashtagmain{
            numberOfSubscribers: number,
            subscribers: Array<number> ,
            _id: string,
            hashtag: string;
}

export interface Login{
  user:any,
  token:string;
}
