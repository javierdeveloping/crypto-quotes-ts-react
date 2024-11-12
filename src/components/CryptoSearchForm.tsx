import { ChangeEvent, FormEvent, useState } from "react";
import { currencies } from "../data"
import { useCryptoStore } from "../store/store"
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";


export default function CryptoSearchForm(){

    const {cryptocurrencies,fetchData} = useCryptoStore();
    const [pair, setPair]=useState<Pair>({
        currency: '',
        cryptocurrency:''
    })

    const [error,setError]=useState('')

    function handleChange(event:ChangeEvent<HTMLSelectElement>){
        setPair({...pair,
            [event.target.name]:event.target.value})
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(Object.values(pair).includes('')){
            setError('Todos los campos son obligatorios');
            return;
        }

        setError('')

        //consultar la API
        fetchData(pair);

    }
    return <form className="form" onSubmit={event=>{handleSubmit(event)}}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="field">
            <label htmlFor="currency">Currency: </label>
            <select name="currency" id="currency" onChange={(event)=>{handleChange(event)}} value={pair.currency}>
                <option value="">--Select--</option>
                {currencies.map(currency => (
                    <option value={currency.code} key={currency.code}>{currency.name}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label htmlFor="cryptocurrency">Cryptocurrency: </label>
            <select name="cryptocurrency" id="cryptocurrency" onChange={(event)=>{handleChange(event)}} value={pair.cryptocurrency}>
                <option value="">--Select--</option>
                {cryptocurrencies.map(cryptocurrency => (
                    <option value={cryptocurrency.CoinInfo.Name} key={cryptocurrency.CoinInfo.Name}>{cryptocurrency.CoinInfo.FullName}</option>
                ))}
            </select>
        </div>

        <input type="submit" value="Get quote"></input>
    </form>
}