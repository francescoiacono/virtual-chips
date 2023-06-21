import SetupForm from './subcomponents/setupForm/setupForm';
import styles from './setup.module.css';

export type Player = {
  name: string;
  chips: number;
  isDealer: boolean;
  isSmallBlind: boolean;
  isBigBlind: boolean;
};

export default function Setup() {
  return (
    <main className={styles.setupPage}>
      <SetupForm />
    </main>
  );
}
