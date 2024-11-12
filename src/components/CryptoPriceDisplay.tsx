import { useMemo } from "react"
import { useCryptoStore } from "../store/store"
import Spinner from "./Spinner";

export default function CryptoPriceDisplay(){

    const {result,loading}=useCryptoStore();

    const hasResult = useMemo(()=>!Object.values(result).includes(''),[result]);
    
    return (<div className="result-wrapper">
    
            {loading ? <Spinner/> : (hasResult && (
                <>
                    <h2>Quote</h2>
                    <div className="result">
                        <img src={`https://cryptocompare.com/${result.IMAGEURL}`}></img>
                        <div>
                            <p>Price: <span>{result.PRICE}</span></p>
                            <p>Highest: <span>{result.HIGHDAY}</span></p>
                            <p>Lowest: <span>{result.LOWDAY}</span></p>
                            <p>Change last 24h: <span>{`${result.CHANGEPCT24HOUR}%`}</span></p>
                            <p>Last update: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                 </>))
            }    
        </div>)
}