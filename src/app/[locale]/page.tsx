import Tooltip from '@/components/tooltip/tooltip';
import styles from './page.module.css';
import { FiAlertCircle } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
export default function Home() {
  const t = useTranslations("Home");
  return (
    <main className={styles.main}>
      <div className={styles.title}>{t('title')}</div>
      <div className={styles.description}>{t('description')}</div>
      <Tooltip
        className={styles.sampleTooltip}
        content='this is a sample tooltip'
        placement='left'
      >
        Hover here <FiAlertCircle />
      </Tooltip>
    </main>
  );
}
