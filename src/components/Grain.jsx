export function Grain({ light = false }) {
  return <div className={`grain${light ? " light" : ""}`} aria-hidden="true" />;
}
