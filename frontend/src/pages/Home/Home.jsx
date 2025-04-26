import styles from "./Home.module.css";

import BgAnimation from "../../components/BgAnimation/BgAnimation";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return (
    <BgAnimation>
      <Navbar/>

      <div className={styles.homeWrapper}>

      </div>
    </BgAnimation>
  )
}

export default Home