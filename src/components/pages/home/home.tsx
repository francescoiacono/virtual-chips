import Link from 'next/link';
import Image from 'next/image';
import styles from './home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Image
        src='/images/ai-chips.png'
        width={200}
        height={200}
        alt='poker chips logo'
      />
      <h1>Welcome to virtual chips</h1>
      <h2>Play poker without poker chips</h2>
      <Link className={styles.startButton} href='/setup'>
        {' '}
        Setup Game
      </Link>
    </main>
  );
}
