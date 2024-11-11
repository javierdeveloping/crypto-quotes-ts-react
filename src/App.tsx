import { useEffect } from "react";
import CryptoSearchForm from "./components/CryptoSearchForm"
import { useCryptoStore } from "./store/store"


function App() {
const {fetchCryptos, Cryptocurrencies} = useCryptoStore();

useEffect(()=>{
  fetchCryptos();
},[fetchCryptos]);

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Quotes for <span>Cryptocurrencies</span>
        </h1>

        <div className="content">
          <CryptoSearchForm/>
        </div>
      </div>
    </>
  )
}

export default App
