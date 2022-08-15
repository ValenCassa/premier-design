/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Dock.module.css";

const GradientCard = ({ src }: { src: string }) => {
  return (
    <div className={styles.gradientCard}>
      <img src={src} alt="gradient" className={styles.gradientImage} />
      <img src={src} alt="gradient" className={styles.gradientImageBehind} />
    </div>
  );
};

export default GradientCard;
