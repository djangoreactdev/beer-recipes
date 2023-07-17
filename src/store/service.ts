import axios from "axios";

import { useEffect, useState } from "react";
import { useStore } from "./store";

export default function App() {
  const { setBeers } = useStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://api.punkapi.com/v2/beers?page=${page}`).then((res) => {
      setBeers(res.data);
    });
  }, [page, setBeers]);
}
