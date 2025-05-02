import styles from "./Chart.module.css";

function Chart({ coinAddress }) {
  return (
    <div className={styles.chartWrapper}>
      <div className={styles.row}>
        <div className={styles.col1}>
          Price USD <br /> $0.002462
        </div>
        <div className={styles.col1}>
          Price <br /> 0.00001639 SOL
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
          <div className={styles.col3}>
            5M <br /> 10%
          </div>
          <div className={styles.col3}>
            1H <br /> 20%
          </div>
          <div className={styles.col3}>
            6H <br /> 30%
          </div>
          <div className={styles.col3}>
            24H <br /> 40%
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col4}>
            TXNS <br /> 10123
          </div>
          <div className={styles.col4}>
            <div className={styles.row}>
              <div className={styles.col4left}>
                Buys <br /> 5000
              </div>
              <div className={styles.col4right}>
                Sells <br /> 6000
              </div>
            </div>
            <div className={styles.bar}/>
          </div>
        </div>
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
            <div className={styles.bar}/>
          </div>
        </div>
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
            <div className={styles.bar}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
