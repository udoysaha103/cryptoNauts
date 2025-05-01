import styles from './Chart.module.css';

function Chart({coinAddress}) {

  return (
    <div className={styles.chartWrapper}>
        <iframe
            id="dexscreener-widget"
            title="Dexscreener Trading Chart"
            width="500"
            height="400"
            src={`https://www.dexscreener.com/widget-chart/en/solana/pe-light/0x${coinAddress}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=true`}
            frameBorder="0"
            allowFullScreen >
        </iframe>
    </div>
  )
}

export default Chart