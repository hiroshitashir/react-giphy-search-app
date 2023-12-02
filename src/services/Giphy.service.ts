import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api'


export default class GifService {
  gf: GiphyFetch
 
  constructor() {
    const GIF_API_KEY = process.env.REACT_APP_GIF_API_KEY
    if (GIF_API_KEY === undefined) {
      throw new Error('Environment variable REACT_APP_GIF_API_KEY is not found. Please get a Giphy API key at https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key and set it in .env file.')
    }
    // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
    this.gf = new GiphyFetch(GIF_API_KEY)
  }

  async searchGIFs(keywords: string): Promise<GifsResult> {
    const result = await this.gf.search(keywords);
    return result;
  }
}