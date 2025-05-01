import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
        <div className={styles.footer1}>
            <div className={styles.footer1Bg}>
                <div className={styles.footer1BgInner}>
                <div className={styles.footer1BgFillImageContainer}>
                    <img src="/footer1f.png" alt="" className={styles.fillImg}/>
                </div>
                <img src="/footer1s.png" alt="" />
                </div>
            </div>

            <div className={styles.footer1Content}>
                <div className={styles.col1}>
                    <img src="/footer1img.png" alt="" />
                    <div className={styles.header}>CryptoNauts Docking</div>
                    <div className={styles.text} style={{fontWeight: "300"}}>Welcome to the world of Nauts. Here, we are bringing together the best Astronauts to explore the crypto universe, creating a Solana army of Nauts with a mission to explore the crypto space.</div>
                    <div><strong>© 2025 nauts.fun. All rights reserved.</strong></div>
                </div>

                <div className={`${styles.col2}`}>
                    <div className={styles.header}>Nauts.Media</div>

                    <a href={import.meta.env.VITE_X} className={`${styles.linkElement}`}>
                        <img src="/x.svg" alt="" style={{borderRadius: 0}}/>
                        <div className={styles.text}>Twitter</div>
                    </a>

                    <a href={import.meta.env.VITE_TG} className={`${styles.linkElement}`}>
                        <img src="/tg.svg" alt="" style={{marginRight: "6%"}}/>
                        <div className={styles.text}>Telegram</div>
                    </a>
                </div>

                <div className={`${styles.col2} ${styles.col3}`}>
                    <div className={styles.header}>$Nauts Token</div>

                    <a href="#" className={`${styles.linkElement} ${styles.text}`}>Pump.fun</a>
                    <a href="#" className={`${styles.linkElement} ${styles.text}`}>PumpSwap</a>
                    <a href="#" className={`${styles.linkElement} ${styles.text}`}>DEX Screener</a>
                    <a href="#" className={`${styles.linkElement} ${styles.text}`}>Coinmarketcap</a>
                    <a href="#" className={`${styles.linkElement} ${styles.text}`}>CoinGecko</a>
                </div>

                <div className={`${styles.col2} ${styles.col4}`}>
                    <div className={styles.header}>Nauts Army</div>

                    <Link to={`/profile/KnightNaut`} className={`${styles.linkElement}`}>
                        <img src="/KnightNaut.png" alt=""/>
                        <div className={styles.text}>KnightNaut</div>
                    </Link>

                    <Link to={`/profile/PepeNaut`} className={`${styles.linkElement}`}>
                        <img src="/PepeNaut.png" alt=""/>
                        <div className={styles.text}>PepeNaut</div>
                    </Link>

                    <Link to={`/profile/SpoderNaut`} className={`${styles.linkElement}`}>
                        <img src="/SpoderNaut.png" alt=""/>
                        <div className={styles.text}>SpoderNaut</div>
                    </Link>

                    <Link to={`/profile/ShibaNaut`} className={`${styles.linkElement}`}>
                        <img src="/ShibaNaut.png" alt=""/>
                        <div className={styles.text}>ShibaNaut</div>
                    </Link>

                    <Link to={`/profile/WizardNaut`} className={`${styles.linkElement}`}>
                        <img src="/WizardNaut.png" alt=""/>
                        <div className={styles.text}>WizardNaut</div>
                    </Link>
                </div>
            </div>
        </div>
        <img className={styles.footer2} src="/footer2.png" alt="" />
    </div>
  )
}

export default Footer