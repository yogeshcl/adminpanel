export interface trends{
            _id: string,
            hashtag: string;
  }

export interface updatetrend{
            _id :string
}

export interface hashtagmain{
            numberOfSubscribers: number,
            subscribers: Array<number> ,
            _id: string,
            hashtag: string;
}

export interface login{
  user:any,
  token:string
}