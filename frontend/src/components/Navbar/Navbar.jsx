import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.leftContent}>
        <div><Link to="/#aboutNauts">About Nauts</Link></div>

        <div className={`${styles.rightButton} ${styles.linkButton}`}>
          <Link to="/lore" className={styles.bgButton}>
            <img src="/rightButtonBg.svg" alt="" />
            <p>Lore</p>
          </Link>
        </div>

        {/* <div><a href="">Github</a></div> */}
        {/* <div><a href="">FAQ</a></div> */}
      </div>

      <div className={styles.centerContent}>
        <Link to='/' className={styles.logo}>
          <p>CRYPTONAUTS</p>
          <img src="/navDesign.svg" alt="" />
        </Link>
      </div>

      <div className={styles.rightContent}>
        {/* <div className={`${styles.rightButton} ${styles.linkButton}`}>
          <Link to="/lore" className={styles.bgButton}>
            <img src="/rightButtonBg.svg" alt="" />
            <p>Lore</p>
          </Link>
        </div> */}

        <div className={`${styles.rightButton} ${styles.linkButton}`} style={{ marginRight: '1vw' }}>
          <Link to={`/#nautsArmy`} className={styles.bgButton}>
            <img src="/rightButtonBg.svg" alt="" className={styles.largeButton}/>
            <p>Explore</p>
          </Link>
        </div>

        <div className={styles.rightButton}>
          <a href="" className={styles.wbgButton}>
            <img src="/tg.svg" alt="Telegram"/>
          </a>
        </div>

        <div className={styles.rightButton}>
          <a href="" className={styles.wbgButton}>
            <img src="/x.svg" alt="X" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar