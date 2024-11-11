import { create } from "zustand";
import { CryptoCurrenciesResponseSchema } from "../schemas/crypto-schema";
import { CryptoCurrency } from "../types";


type CryptoStore = {
    cryptocurrencies: CryptoCurrency[]
    fetchCryptos: ()=> Promise<CryptoCurrency[]>
}
async function getCryptos(){
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

export const useCryptoStore = create<CryptoStore>(function(){
    return { 
        cryptocurrencies:[],
        fetchCryptos: async function() {
            console.log("desde fetch cryptos");
            const cryptocurrencies = await getCryptos();
            console.log(cryptocurrencies)
            return cryptocurrencies;
    }}});