import styles from "./Home.module.css";

import { useEffect, useState } from "react";

import BgAnimation from "../../components/BgAnimation/BgAnimation";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";

function Home() {
  const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            console.error("Fallback: Failed to copy:", err);
            document.body.removeChild(textArea);
            return false;
        }
    } catch (err) {
        console.error("Failed to copy:", err);
        return false;
    }
  };


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
                  <div className={styles.c1r1_name}>Cryptonaut</div>
                  <div className={styles.c1r1_mcap}>Mcap : {baseMarketCap}</div>
                </div>
                <div className={styles.c1r2}>
                  Beyond the edge of SOL-320B, hidden among the stars,
                  lies Cryptonauts — the last frontier of the memecoin revolution.
                  Led by $Naut, the first of the undocked, we do not chase moons.
                  We forge constellations of wealth.<br/>
                  <br/>
                  In a universe where fortunes are written among the stars,
                  Cryptonaut leads the charge.
                  Buckle up. Your journey to unimaginable heights begins — now.
                </div>
                <div className={styles.c1r3}>
                  <div className={styles.c1r3CA}>CA: {import.meta.env.VITE_BASE_COIN_ADDRESS}</div>
                  <div className={styles.copyButtonContainer} onClick={() => {copyToClipboard(import.meta.env.VITE_BASE_COIN_ADDRESS)}}>
                    <img src="cpyBtn.png" alt="" />
                  </div>
                </div>
                <div className={styles.c1r4}>
                  <div className={styles.c1r4btn}>
                    <img src="hc1btn.png" alt="" />
                    <span>About Nauts</span>
                  </div>

                  <div className={styles.c1r4btn} style={{marginLeft: "5%"}}>
                    <img src="hc1btn.png" alt="" />
                    <span>Buy $Nauts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.slider}>
            <Slider/>
          </div>

          <div className={styles.sec3}>
            <div className={styles.sec3Bg}>
              <div className={styles.sec3BgInner}>
                <div className={styles.sec3BgFillImageContainer}>
                  <img src="hc3f.png" alt="" className={styles.fillImg}/>
                </div>
                <img src="hc3s.png" alt="" />
              </div>
            </div>

            <div className={styles.sec3Content}>
              <img src="hc3img.png" alt="" />

              <div className={styles.sec3ContentText}>
                
                <div className={styles.sec3ContentText1_1}>About Nauts</div>
                
                <div className={styles.sec3ContentText1_2}>
                  CryptoNauts are voyagers lost in the void — some docked, many still drifting across the endless dark.<br/><br/>
                  
                  The first Naut has found his way to Station Xeon... but countless others await a hand to guide them home. If you hold $50 worth of $Nauts Tokens, you hold the power to awaken a Naut.<br/><br/>
                  
                  Find an Undocked Naut, follow the docking sequence on pump.fun, and breathe life into the fleet.Each Naut you Dock is forever bound to your legacy, your tokens, and the growing legend of the CryptoNauts.

                  <br/><br/>The stars call, traveler. Will you answer?
                </div>
                
                <div className={styles.sec3BtnContainer}>
                  <div className={styles.sec3Btn}>
                    <img src="hc1btn.png" alt="" />
                    <span>Explore Nauts</span>
                  </div>

                  <div className={styles.sec3Btn} style={{marginLeft: "5%"}}>
                    <img src="hc1btn.png" alt="" />
                    <span>Buy $Nauts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BgAnimation>
  )
}

export default Home