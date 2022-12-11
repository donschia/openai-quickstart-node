import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  // Added option to change the Temperature
  const [temperatureInput, setTemperatureInput] = useState(0.6);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const request = JSON.stringify({
      animal: animalInput,
      temperature: temperatureInput,
    });
    console.log(request);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: request,
    });

    const data = await response.json();
    setResult(data.result);
    // reset values ?
    //setAnimalInput("");
    //setTemperatureInput(0.6);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input
            type="range"
            name="temperature"
            min="0.0"
            max="1.0"
            step="0.1"
            placeholder="Pick a temperature"
            aria-label="Pick a temperature"
            value={temperatureInput}
            onChange={(e) => setTemperatureInput(Number(e.target.value))}
          />
          {temperatureInput}
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
