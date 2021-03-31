document.addEventListener("DOMContentLoaded", () => {
  const url =
    "https://cdn.mercadobitcoin.com.br/api/tickers?pairs=BRLBTC,USDBTC&ProntoRequestbuster=1617220672198";

  const inputBtc = document.querySelector("#btc");
  const real = document.querySelector("#real");
  const savedBtc = localStorage.getItem("btc");

  const myHeaders = new Headers();

  const myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  let currentValue = 0;

  btc.value = savedBtc;
  real.innerText = localStorage.getItem("total");

  const formatToReal = (value) =>
    new Number(value).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

  const bitcointToReal = () => {
    const btc = new Number(inputBtc.value);
    const total = btc * currentValue;
    localStorage.setItem("total", total);
    localStorage.setItem("btc", btc);
    real.innerText = formatToReal(total);
  };

  function call() {
    fetch(url, myInit)
      .then((resp) => resp.json())
      .then((resp) => {
        currentValue = new Number(resp.ticker[0].last);
        document.querySelector("#bitcoin").innerText = formatToReal(
          currentValue
        );
        bitcointToReal();
      });
  }

  document.querySelector("#btn").addEventListener("click", call);

  call();
});
