import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import { formatPrice } from "../../utils/priceFormat";
import { formatAge } from "../../utils/timeConvert";

const Chart = ({ coinAddress }) => {
  const [chartData, setChartData] = useState({});
  const [currentDuration, setCurrentDuration] = useState("h24");
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/search?q=${coinAddress}`
      );
      const data = await response.json();
      setChartData(data.pairs[0]);
      // console.log(data.)
    })();
  }, []);
  return (
    <div className={styles.chartWrapper}>
      <div className={styles.row}>
        <div className={styles.col1}>
          Price USD <br /> <span>${chartData?.priceUsd}</span>
        </div>
        <div className={styles.col1}>
          Price <br /> <span>{chartData?.priceNative} SOL</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col2}>
          Liquidity <br /> <span>${formatPrice(chartData?.liquidity?.usd)}</span>
        </div>
        <div className={styles.col2}>
          FDV <br /> <span>${formatPrice(chartData?.fdv)}</span>
        </div>
        <div className={styles.col2}>
          MKT Cap <br /> <span>${formatPrice(chartData?.marketCap)}</span>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.row}>
          <div
            className={`${styles.col3} ${
              currentDuration === "m5" ? styles.selected : ""
            }`}
            onClick={() => setCurrentDuration("m5")}
          >
            5M <br />
            <span
              className={
                chartData?.priceChange?.m5 > 0 ? styles.green : styles.red
              }
            >
              {chartData?.priceChange?.m5}%
            </span>
          </div>
          <div
            className={`${styles.col3} ${
              currentDuration === "h1" ? styles.selected : ""
            }`}
            onClick={() => setCurrentDuration("h1")}
          >
            1H <br />
            <span
              className={
                chartData.priceChange?.h1 > 0 ? styles.green : styles.red
              }
            >
              {chartData.priceChange?.h1}%
            </span>
          </div>
          <div
            className={`${styles.col3} ${
              currentDuration === "h6" ? styles.selected : ""
            }`}
            onClick={() => setCurrentDuration("h6")}
          >
            6H <br />
            <span
              className={
                chartData.priceChange?.h6 > 0 ? styles.green : styles.red
              }
            >
              {chartData.priceChange?.h6}%
            </span>
          </div>
          <div
            className={`${styles.col3} ${
              currentDuration === "h24" ? styles.selected : ""
            }`}
            onClick={() => setCurrentDuration("h24")}
          >
            24H <br />
            <span
              className={
                chartData.priceChange?.h24 > 0 ? styles.green : styles.red
              }
            >
              {chartData.priceChange?.h24}%
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col32}>
              Vol <small>(5M)</small><br/>{formatPrice(chartData.volume?.m5)}
          </div>
          <div className={styles.col32}>
              Vol <small>(1H)</small><br/>{formatPrice(chartData.volume?.h1)}
          </div>
          <div className={styles.col32}>
              Vol <small>(6H)</small><br/>{formatPrice(chartData.volume?.h6)}
          </div>
          <div className={styles.col32}>
              Vol <small>(24H)</small><br/>{formatPrice(chartData.volume?.h24)}
          </div>
        </div>
        {(() => {
          const buys = chartData.txns?.[currentDuration]?.buys;
          const sells = chartData.txns?.[currentDuration]?.sells;
          const ratio = 100 / (buys + sells);
          const buyRatio = buys + sells === 0 ? 50 : (buys * ratio).toFixed(2);
          return (
            <div className={styles.row}>
              <div className={styles.col4}>
                TXNS <br /> <span>{buys + sells}</span>
              </div>
              <div className={styles.col4}>
                <div className={styles.row}>
                  <div className={styles.col4left}>
                    Buys <br /> <span>{buys}</span>
                  </div>
                  <div className={styles.col4right}>
                    Sells <br /> <span>{sells}</span>
                  </div>
                </div>
                <div
                  className={styles.bar}
                  style={{
                    background: `linear-gradient(to right, #a4cf5e ${buyRatio}%, #f45b5b ${buyRatio}%)`,
                  }}
                />
              </div>
            </div>
          );
        })()}
        <div className={`${styles.row} ${styles.age}`}>
          <div className={styles.col5}>Pair created</div>
          <div className={styles.col5}>
            <span>{formatAge(chartData.pairCreatedAt)} ago</span>
          </div>
        </div>
      </div>
      <h4 className={styles.footer}>Powered by DEXSCREENER</h4>
    </div>
  );
};

export default Chart;
