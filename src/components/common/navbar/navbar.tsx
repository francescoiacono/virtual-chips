import Link from 'next/link';

import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <h3>ChipWiz</h3>
      </div>
      <ul className={styles.navbarMenu}>
        <li>
          <Link href='/' className={styles.navbarMenuItem}>
            Home
          </Link>
        </li>
        <li>
          <Link href='/setup' className={styles.navbarMenuItem}>
            Setup Game
          </Link>
        </li>
      </ul>
    </nav>
  );
}
