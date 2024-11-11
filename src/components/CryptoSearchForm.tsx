import { currencies } from "../data"


export default function CryptoSearchForm(){
    return <form className="form">
        <div className="field">
            <label htmlFor="currency">Currency: </label>
            <select name="currency" id="currency">
                <option value="">--Select--</option>
                {currencies.map(currency => (
                    <option value={currency.code} key={currency.code}>{currency.name}</option>
                ))}
            </select>
        </div>

        <div className="field">
            <label htmlFor="cryptocurrency">Cryptocurrency: </label>
            <select name="cryptocurrency" id="cryptocurrency">
                <option value="">--Select--</option>
            </select>
        </div>

        <input type="submit" value="Get quote"></input>
    </form>
}