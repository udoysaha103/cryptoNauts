import styles from './Chart.module.css';

function Chart() {
  return (
    <div className={styles.chartWrapper}>
        <iframe
            id="dexscreener-widget"
            title="Dexscreener Trading Chart"
            width="500"
            height="400"
            src="https://www.dexscreener.com/widget-chart/en/ethereum/pe-light/0xHrAgkjmK9PHUyQ4ijU6j6NVvAZQ4HQ1jPCsm626cZxSQ?theme=light&chartType=1&chartResolution=30&drawingToolbars=true"
            frameBorder="0"
            allowFullScreen >
        </iframe>
    </div>
  )
}

export default Chart