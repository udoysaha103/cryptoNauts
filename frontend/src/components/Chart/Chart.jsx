import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import { formatPrice } from "../../utils/priceFormat";

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
    })();
  }, []);
  return (
    <div className={styles.chartWrapper}>
      <div className={styles.row}>
        <div className={styles.col1}>
          Price USD <br /> ${chartData.priceUsd}
        </div>
        <div className={styles.col1}>
          Price <br /> {chartData.priceNative} SOL
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col2}>
          Liquidity <br /> $193K
        </div>
        <div className={styles.col2}>
          FDV <br /> $2.4M
        </div>
        <div className={styles.col2}>
          MKT Cap <br /> $2.4M
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
            5M <br /> 10%
          </div>
          <div
            className={`${styles.col3} ${
              currentDuration === "h1" ? styles.selected : ""
            }`}
            onClick={() => setCurrentDuration("h1")}
          >
            1H <br /> 20%
          </div>
          <div
            className={`${styles.col3} ${
              currentDuration === "h6" ? styles.selected : ""
            }`}
            onClick={() => setCurrentDuration("h6")}
          >
            6H <br /> 30%
          </div>
          <div
            className={`${styles.col3} ${
              currentDuration === "h24" ? styles.selected : ""
            }`}
            onClick={() => setCurrentDuration("h24")}
          >
            24H <br /> 40%
          </div>
        </div>
        {(() => {
          const buys = chartData.txns?.[currentDuration]?.buys;
          const sells = chartData.txns?.[currentDuration]?.sells;
          const ratio = 100 / (buys + sells);
          const buyRatio = (buys + sells) === 0 ? 50 : (buys * ratio).toFixed(2);
          return (
            <div className={styles.row}>
              <div className={styles.col4}>
                TXNS <br /> {buys + sells}
              </div>
              <div className={styles.col4}>
                <div className={styles.row}>
                  <div className={styles.col4left}>
                    Buys <br /> {buys}
                  </div>
                  <div className={styles.col4right}>
                    Sells <br /> {sells}
                  </div>
                </div>
                <div
                  className={styles.bar}
                  style={{
                    background: `linear-gradient(to right, green ${buyRatio}%, red ${buyRatio}%)`,
                  }}
                />
              </div>
            </div>
          );
        })()}
        {(() => {
          return (
            <div className={styles.row}>
              <div className={styles.col4}>
                Volume <br /> $1.8M
              </div>
              <div className={styles.col4}>
                <div className={styles.row}>
                  <div className={styles.col4left}>
                    Buy Vol <br /> $953K
                  </div>
                  <div className={styles.col4right}>
                    Sell Vol <br /> $955K
                  </div>
                </div>
                <div
                  className={styles.bar}
                  style={{
                    background: `linear-gradient(to right, green 50%, red 50%)`,
                  }}
                />
              </div>
            </div>
          );
        })()}
        <div className={styles.row}>
          <div className={styles.col4}>
            Makers <br /> 3010
          </div>
          <div className={styles.col4}>
            <div className={styles.row}>
              <div className={styles.col4left}>
                Buyers <br /> 2305
              </div>
              <div className={styles.col4right}>
                Sellers <br /> 2188
              </div>
            </div>
            <div
              className={styles.bar}
              style={{
                background: `linear-gradient(to right, green 50%, red 50%)`,
              }}
            />
          </div>
        </div>
      </div>
      <h4 className={styles.footer}>Powered by Dexscreener</h4>
    </div>
  );
};

export default Chart;
