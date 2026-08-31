import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Handle } from "react-compare-slider/components";
import styles from "./CompareSlider.module.css";

interface CompareSliderProps {
  itemOne: string;
  itemTwo: string;
  altOne: string;
  altTwo: string;
  labelOne?: string;
  labelTwo?: string;
}

export function CompareSlider({
  itemOne,
  itemTwo,
  altOne,
  altTwo,
  labelOne,
  labelTwo,
}: CompareSliderProps) {
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
