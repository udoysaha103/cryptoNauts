import styles from './Chart.module.css';

function Chart({coinAddress}) {

  return (
    <div className={styles.chartWrapper}>
        <iframe
            id="dexscreener-widget"
            title="Dexscreener Trading Chart"
            width="500"
            height="400"
            src={`https://gmgn.ai/`}
            frameBorder="0"
            allowFullScreen >
        </iframe>
    </div>
  )
}

export default Chart