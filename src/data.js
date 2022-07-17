import { useEffect } from "react";

import yahooFinance from "yahoo-finance";


const data = async ()  => {
    try {
        const response = await yahooFinance.quote({ symbol: "TSLA" });
        console.log(response);
        return response
    } catch (err) {
        console.log(err);
        return []
    }
}

export default data