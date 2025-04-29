import styles from "./Home.module.css";

import { useEffect, useState } from "react";

import BgAnimation from "../../components/BgAnimation/BgAnimation";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";

function Home() {
  const [baseMarketCap, setBaseMarketCap] = useState(0);

  const formatKMB = (num) => {
    if (num >= 1000000000) {
      return (
        (num % 1000000000 === 0
          ? (num / 1000000000).toFixed(0)
          : (num / 1000000000).toFixed(1)) + "B"
      );
    } else if (num >= 1000000) {
      return (
        (num % 1000000 === 0
          ? (num / 1000000).toFixed(0)
          : (num / 1000000).toFixed(1)) + "M"
      );
    } else if (num >= 1000) {
      return (
        (num % 1000 === 0 ? (num / 1000).toFixed(0) : (num / 1000).toFixed(1)) +
        "K"
      );
    } else {
      return num.toString();
    }
  };

  useEffect(() => {
    const fetchMarketCap = async (coinAddress) => {
      const apiUrl = `https://api.dexscreener.com/token-pairs/v1/solana/${coinAddress}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return formatKMB(data[0].marketCap);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    setBaseMarketCap(fetchMarketCap(import.meta.env.VITE_BASE_COIN_ADDRESS));
  }, []);

  return (
    <BgAnimation>
      <div className={styles.allWrapper}>
        <Navbar/>

        <div className={styles.homeWrapper}>

          <div className={styles.newsSection}>
            <div className={styles.sec2left}>
              <img src="sec2_1.svg" alt="" />
              <div className={styles.sec2leftContent}>
                <div>New Docks:</div>
                <div>
                  <img src="#" alt="Naut Img" />
                  {/* latest docked coin */}
                </div>
              </div>
            </div>
            <div className={styles.sec2center}>
              <img src="sec2_2.svg" alt="" />
            </div>
            <div className={`${styles.sec2left} ${styles.sec2right}`}></div> 
          </div>

          <div className={styles.baseCoin}>
            <div className={styles.baseBg}>
              <div className={styles.baseBgInner}>
                <div className={styles.baseBgFillImageContainer}>
                  <img src="hc1f.png" alt="" className={styles.fillImg}/>
                </div>
                <img src="hc1s.png" alt="" />
              </div>
            </div>
            <div className={styles.baseContent}>
              <div className={styles.contentimage}>
                <img src="hc1f1.png" alt="CryptoNaut" />
              </div>

              <div className={styles.contentText}>
                <div className={styles.c1r1}>
                  <div>Cryptonaut</div>
                  <div>Mcap : {baseMarketCap}</div>
                </div>
                <div className={styles.c1r2}>
                  Beyond the edge of SOL-320B, hidden among the stars,<br/>
                  lies Cryptonauts — the last frontier of the memecoin revolution.<br/>
                  Led by $Naut, the first of the undocked, we do not chase moons.<br/>
                  We forge constellations of wealth.<br/>
                  <br/>
                  In a universe where fortunes are written among the stars, <br/>
                  Cryptonaut leads the charge.<br/>
                  Buckle up. Your journey to unimaginable heights begins — now.<br/>
                </div>
                <div className={styles.c1r3}>
                  <div>CA: {import.meta.env.VITE_BASE_COIN_ADDRESS}</div>
                  <div className={styles.copyButtonContainer}></div>
                </div>
                <div className={styles.c1r4}></div>
              </div>
            </div>
          </div>

          <div className={styles.slider}>
            <Slider/>
          </div>

          {/* <div style={{display: "flex", alignItems: "center", justifyContent: "center", position: "relative"}}>
            <img src="Container Blur FIll.svg" alt=""  style={{opacity: "0.2", filter: "blur(10px)"}}/>
            <img src="Empty Container.svg" alt="" style={{position: "absolute"}} />
          </div> */}
        </div>
      </div>
    </BgAnimation>
  )
}

export default Home