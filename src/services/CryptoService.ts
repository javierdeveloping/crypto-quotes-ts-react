import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/crypto-schema";
import { CryptoPrice, Pair } from "../types";


export const emptyPrice: CryptoPrice = {
    HIGHDAY: '',
    PRICE: '',
    LOWDAY: '',
    LASTUPDATE: '',
    IMAGEURL: '',
    CHANGEPCT24HOUR: ''
}

export async function getCryptos(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

    try {
        // Await the response of the fetch call
        const response = await fetch(url);
        
        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Await the parsing of JSON data
        const {Data: cryptos} = await response.json();
        // console.log(cryptos)
        
        const result = CryptoCurrenciesResponseSchema.safeParse(cryptos);

        // Log or process the data
        // console.log({result});
        
      if(result.success){
        return result.data;
      }

      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching data:', error);
      }

      return [];

}

export async function fetchCurrentCryptoPrice(pair: Pair){
    console.log(pair);

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`

    try {
        // Await the response of the fetch call
        const response = await fetch(url);
        
        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Await the parsing of JSON data
        const {DISPLAY} = await response.json();
        console.log(DISPLAY[pair.cryptocurrency][pair.currency])
        
         const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency]);


        if(result.success){
            console.log(result.data);
            return result.data;
        }

      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching data:', error);
      }

      return emptyPrice;

}

