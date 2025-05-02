import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BgAnimation from "../../components/BgAnimation/BgAnimation";
import Chart from "../../components/Chart/Chart";


function Profile() {
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


  const { coinName } = useParams();
  const [coinData, setCoinData] = useState(null);
   
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getDetails/${coinName}`);
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, [coinName]);

  return (
    <BgAnimation>
      <div className={styles.allWrapper}>
        <Navbar />

        <div className={styles.profileWrapper}>
          <div className={styles.sec1}>
            <div className={styles.sec1Bg}>
                <div className={styles.sec1BgInner}>
                <div className={styles.sec1BgFillImageContainer}>
                    <img src="/pc1f.png" alt="" className={styles.fillImg}/>
                </div>
                <img src="/pc1s.png" alt="" />
                </div>
            </div>

            <div className={styles.sec1Content}>
              <img src={`/${coinName}.png`} alt="" />

              <div className={styles.sec1ContentRight}>
                <div className={styles.coinName}>{coinName}</div>

                <div className={styles.c1r2}>
                  <strong>{coinData && coinData.rank}</strong> - {coinData && coinData.rankDesc}
                </div>


                <div className={styles.c1r3}>
                  {coinData && coinData.contractAddress ? 
                    (<>
                      <div className={styles.c1r3CA}>CA: {coinData.contractAddress}</div>
                      <div className={styles.copyButtonContainer} onClick={() => {copyToClipboard(coinData.contractAddress)}}>
                        <img src="/cpyBtn.png" alt="" />
                      </div>
                    </>) :
                    (
                      <div className={styles.c1r3CA}>Undocked naut. CA to be announced.</div>
                    )
                  }
                </div>


                <div className={styles.c1r4}>
                  <a className={styles.c1r4btn} href={coinData && coinData.contractAddress ? `https://dexscreener.com/solana/${coinData.contractAddress}` : "#"} target={coinData && coinData.contractAddress ? "_blank" : ""}>
                    <img src="/hc1btn.png" alt="" />
                    <span>Buy ${coinData.ticker}</span>
                  </a>

                  <a className={styles.c1r4btn} style={{marginLeft: "5%"}}>
                    <img src="/hc1btn.png" alt="" />
                    <span>About Nauts</span>
                  </a>
                </div>

              </div>
            </div>
          </div>


          {/* Actually section 2 */}
          <div className={styles.sec1} style={{height: "80vh"}}>
            <div className={styles.sec1Bg}>
                <div className={styles.sec1BgInner}>
                <div className={styles.sec1BgFillImageContainer}>
                    <img src="/pc2f.png" alt="" className={styles.fillImg}/>
                </div>
                <img src="/pc2s.png" alt="" />
                </div>
            </div>

            <div className={styles.sec1Content}>
              <div className={styles.sec2_1}>
                {coinData && coinData.contractAddress ?
                  <Chart coinAddress={coinData.contractAddress} /> :
                  <div className={styles.sec2_1NoChart}>Undocked naut. <br/>Details and CA TBA</div>
                }
              </div>

              <div className={styles.sec2_2}>
                <div className={styles.coinName}>About {coinName}</div>
                
                <div>
                  <div style={{marginBottom: "1vh"}}><strong><u>Ticker</u></strong></div>
                  <div style={{fontWeight: 300}}>${coinData && coinData.ticker}</div>
                </div>

                <div>
                  <div style={{marginBottom: "1vh"}}><strong><u>Description</u></strong></div>
                  <div style={{fontWeight: 300}}>{coinData && coinData.desc}</div>
                </div>

                <div className={styles.c1r4} style={{justifyContent: "space-between"}}>
                  <a className={`${styles.c1r4btn} ${styles.c1r4btn2}`} href={coinData && coinData.contractAddress ? `https://dexscreener.com/solana/${coinData.contractAddress}` : "#"} target={coinData && coinData.contractAddress ? "_blank" : ""}>
                    <img src="/hc1btn.png" alt="" />
                    <span>Buy ${coinData.ticker}</span>
                  </a>

                  <div className={styles.sec2_2Socials}>
                    <a href={import.meta.env.VITE_TG} target={"_blank"}><img src="/tg.svg" alt="" /></a>
                    <a href={import.meta.env.VITE_X} target={"_blank"}><img src="/x.svg" alt="" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <Footer />
      </div>
    </BgAnimation>
  )
}

export default Profile