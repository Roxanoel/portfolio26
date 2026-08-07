import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { Handle } from "react-compare-slider/components";
import styles from "./CompareSlider.module.css";

export function CompareSlider({
  itemOne,
  itemTwo,
  altOne,
  altTwo,
  labelOne,
  labelTwo,
}) {
  const handle =
    labelOne || labelTwo ? (
      <div className={styles.handleRow}>
        {labelOne && <span className={styles.labelLeft}>{labelOne}</span>}
        <Handle />
        {labelTwo && <span className={styles.labelRight}>{labelTwo}</span>}
      </div>
    ) : undefined;

  return (
    <div className={styles.wrapper}>
      <ReactCompareSlider
        className={styles.slider}
        handle={handle}
        itemOne={<ReactCompareSliderImage src={itemOne} alt={altOne} />}
        itemTwo={<ReactCompareSliderImage src={itemTwo} alt={altTwo} />}
      />
    </div>
  );
}
