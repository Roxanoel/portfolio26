import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import styles from "./CompareSlider.module.css";

export function CompareSlider({ itemOne, itemTwo, altOne, altTwo }) {
  return (
    <div className={styles.wrapper}>
      <ReactCompareSlider
        className={styles.slider}
        itemOne={<ReactCompareSliderImage src={itemOne} alt={altOne} />}
        itemTwo={<ReactCompareSliderImage src={itemTwo} alt={altTwo} />}
      />
    </div>
  );
}
