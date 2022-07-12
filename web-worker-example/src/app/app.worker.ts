/// <reference lib="webworker" />

import {PrimeCalculator} from "./app.prime";

/** A web worker is created. Web worker is basically a function, which will be called when a message event is fired.
 * The web worker will receive the data send by the caller, process it and then send the response back to the caller. */
addEventListener('message', ({ data }) => {
  const response = PrimeCalculator.findNthPrimeNumber(parseInt(data));
  console.log('response', response)
  postMessage(response);
});
