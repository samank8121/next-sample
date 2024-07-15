import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function Product() {
  const t = useTranslations("Product");
  return (
    <div className={styles.description}>
    {t("title")}
    </div>
  );
}
