import Tooltip from '@/components/tooltip/tooltip';
import styles from './page.module.css';
import { FiAlertCircle } from 'react-icons/fi';
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Tooltip className={styles.sampleTooltip} content='this is a sample tooltip' placement='left'>
          Hover here <FiAlertCircle />
        </Tooltip>
      </div>
    </main>
  );
}
