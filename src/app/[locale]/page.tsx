import Tooltip from '@/components/tooltip/tooltip';
import styles from './page.module.css';
import { FiAlertCircle } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/product-card/product-card';
export default function Home() {
  const t = useTranslations("Home");
  return (
    <main className={styles.main}>
      <div className={styles.title}>{t('title')}</div>
      <div className={styles.description}>{t('description')}</div>
      <Tooltip
        className={styles.sampleTooltip}
        content={t('tooltipContent')}
        placement='left'
      >
        {t('tooltip')}
        <FiAlertCircle />
      </Tooltip>
      <ProductCard
        product={{ id: 1, caption: 'caption', rate: 5, price: 100, unit: 'gr' }}
        value={2}
      ></ProductCard>
    </main>
  );
}
