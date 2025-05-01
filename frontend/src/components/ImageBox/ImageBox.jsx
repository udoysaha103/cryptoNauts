import styles from './ImageBox.module.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageBox({coinName}) {
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState(null);
  const [marketCap, setMarketCap] = useState("Undocked");

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

    const fetchCoinData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getDetails/${coinName}`);
        const data = await response.json();
        setCoinData(data);

        if (data && data.contractAddress) {
          const marketCapValue = await fetchMarketCap(data.contractAddress);
          setMarketCap(`MC:${marketCapValue}`);
        } else {
          setMarketCap("Undocked");
        }
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    fetchCoinData();
  }, [coinName]);

  return (
    <div className={styles.imageBox} onClick={() => navigate(`/profile/${coinName}`)}>
      <img src={`/${coinName}.png`} alt="" />
      <div className={styles.imgContent}>
        <div className={styles.ingContentInner}>
          <div className={styles.marketCap}>{marketCap}</div>
          <div className={styles.coinName}>{coinName}</div>
          <img src={coinData && coinData.contractAddress ? "/dockedIcon.png" : "/undockedIcon.png"} alt="" className={coinData && coinData.contractAddress ? styles.dockedImg : styles.undockedImg}/>
        </div>
      </div>
    </div>
  )
}

export default ImageBox