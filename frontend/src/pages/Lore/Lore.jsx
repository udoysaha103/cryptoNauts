import styles from "./Lore.module.css";

import BgAnimation from "../../components/BgAnimation/BgAnimation";
import Navbar from "../../components/Navbar/Navbar";

function Lore() {
  return (
    <BgAnimation>
      <Navbar/>

      <div className={styles.animationWrapper}>
        <div className={styles.topText}>
          <p className={styles.header}>THE CRYPTONAUTS SAGA</p>
          <p className={styles.episode}>Episode I: RISE OF THE HIDDEN CONSTELLATION</p>
        </div>

        <div className={styles.loreText}>
          <p>Beyond the reaches of human discovery lies SOL-320B, <br/>
            a world veiled in cosmic storms and ancient secrets.<br/><br/>
            Orbiting this forbidden planet, the Space Station Xeon <br/>
            serves as the last sanctuary for those who dare challenge fate.<br/><br/>
            But from the darkness beneath fractured moons,  <br/>
            a sinister force stirs — the VOID PROTOCOL.  <br/>
            Led by the Supreme Controller XEROS,  <br/>
            the first of the Corrupted,  <br/>
            this shadow empire seeks to enslave the galaxy  <br/>
            by rewriting the very fabric of existence itself.<br/><br/>
            Amidst the chaos, the NAUTS rise,  <br/>
            warriors born of stardust and encrypted dreams.  <br/>
            Some stand as guardians: the fierce BullNaut,  <br/>
            the elusive SatoshiNaut, the vengeful Batnaut. <br/> 
            Others teeter dangerously on the edge,  <br/>
            tempted by XEROS' whispers of ultimate power.<br/><br/>
            Each week, new NAUTS awaken.  <br/>
            Star-born apprentices, rogue creations, outlaw dreamers  <br/>
            some bound by honor, others destined for betrayal.<br/><br/>
            But the crypto-force trembles.  <br/>
            Not all will remain loyal.<br/><br/>
            As alliances fracture and shadows stretch across the stars,  <br/>
            a final truth becomes clear:<br/><br/>
            THE NAUTS ARE AWAKENING.<br/>
            THE VOID IS HUNGERING.<br/>
            THE FATE OF SOL-320B HANGS IN THE BALANCE.<br/>
          </p>
        </div>
      </div>
    </BgAnimation>
  )
}

export default Lore