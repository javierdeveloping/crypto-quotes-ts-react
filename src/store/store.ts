import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency, Pair,CryptoPrice } from "../types";
import { emptyPrice, fetchCurrentCryptoPrice, getCryptos } from "../services/CryptoService";


type CryptoStore = {
    cryptocurrencies: CryptoCurrency[]
    result: CryptoPrice,
    loading: boolean,
    fetchCryptos: ()=> Promise<void>
    fetchData: (pair:Pair)=>Promise<void>
}


export const useCryptoStore = create<CryptoStore>()(devtools((function(set){
    return { 
        cryptocurrencies:[],
        result: emptyPrice, //instead of defining all properties to empty or so
        loading: false,
        fetchCryptos: async function() {
            console.log("desde fetch cryptos");
            set(()=>({loading: true}));
            const cryptocurrencies = await getCryptos();
            set(()=>({
                cryptocurrencies,
                loading: false
            }));
        },
        fetchData:async function(pair:Pair){
            console.log(pair);
            set(()=>({loading: true}));
            const result = await fetchCurrentCryptoPrice(pair);
            set(()=>({result,  loading: false}));
        }
}})));