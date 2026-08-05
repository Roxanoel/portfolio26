import { ProjectLayout } from "../../components/ProjectLayout";
import { Slide } from "../../components/Slide";
import { CompareSlider } from "../../components/CompareSlider";
import { PROJECTS } from "../../data/projects";
import lineChartLight from "../../assets/project-design-system-overhaul/line-chart-light.png";
import lineChartDark from "../../assets/project-design-system-overhaul/line-chart-dark.png";
import lineChartContainedLight from "../../assets/project-design-system-overhaul/line-chart-contained-light.png";
import lineChartContainedDark from "../../assets/project-design-system-overhaul/line-chart-contained-dark.png";
import originalTooltip from "../../assets/project-design-system-overhaul/origina_amcharts_tooltip.png";
import opteoDsTooltip from "../../assets/project-design-system-overhaul/opteo_ds_tooltip.png";
import slideStyles from "../../components/Slide.module.css";

const project = PROJECTS.find((p) => p.slug === "design-system-overhaul");

export function OpteoDesignSystemOverhaul() {
  return (
    <ProjectLayout project={project}>
      <Slide id="slide-charts">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Charts</p>
          <h2 className={slideStyles.title}>
            Performance-first data visualisation
          </h2>
        </hgroup>
        <p className={slideStyles.body}>
          The existing in-house chart components were tightly coupled to
          business logic and poorly documented, making reuse impractical. Using
          a line chart outside its original context required convoluted
          workarounds or ad-hoc changes. The SVG-based rendering also struggled
          with larger datasets.
        </p>
        <div className={slideStyles.contentBody} style={{ marginTop: "1.5em" }}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Solution architecture
            </h3>
            <p className={slideStyles.contentParagraph}>
              Our design lead evaluated charting libraries against two criteria:
              sufficient customisation to match our design system, and Vue
              compatibility. We settled on amCharts and built a shared
              integration layer that translates our data format to the
              library&apos;s expected structure, reused across every chart
              component — line, area, donut, bar, and more. I was then
              responsible for building the specific logic for all chart types.
            </p>
            <CompareSlider
              itemOne={lineChartContainedLight}
              itemTwo={lineChartContainedDark}
              altOne="Contained line chart in light mode"
              altTwo="Contained line chart in dark mode"
            />
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Main Challenge: Custom Tooltips
            </h3>
            <p className={slideStyles.contentParagraph}>
              To match our design system, we couldn&apos;t use the built-in
              styles for the amCharts tooltips. I had to build a custom tooltip,
              which involved several challenges.
            </p>
            <h4 className={slideStyles.contentHeading}>
              Multiple series, one tooltip
            </h4>
            <p className={slideStyles.contentParagraph}>
              The default behavior of tooltips in amcharts5 is to display one
              tooltip per series, based on whichever series the user is hovering
              on. However, from a user's perspective, this is an annoyance. In
              the vast majority of cases, multiple series are there to be
              compared. The desired user experience was to have one tooltip for
              each point on the X axis, and displaying the Y-axis value for each
              series in one tooltip. To achieve this, I had to hook into the
              tooltip adapter API to generate our custom content and HTML
              structure, replacing the default amcharts5 tooltip.
            </p>
            <h4 className={slideStyles.contentHeading}>Positioning</h4>
            <p className={slideStyles.contentParagraph}>
              The next challenge was positioning the tooltip. Once we
              implemented our custom tooltip, we saw that by default, it was
              getting positioned over the first series. Instead, we wanted the
              tooltip to always be positioned slightly above the highest of the
              lines/values at this point on the X axis.
              <br />
              <br />I achieved this by creating a "phantom" series whose data is
              the maximum Y value per X coordinate across all real series. This
              series is rendered with strokeOpacity: 0 (rather than "display:
              hidden"), to make it invisible while still triggering mouseover
              events. The result: the cursor and tooltip lock to the highest
              peak at each date rather than to any individual series, while the
              tooltip's HTML adapter independently queries all real series to
              populate the content.
            </p>
            <CompareSlider
              itemOne={opteoDsTooltip}
              itemTwo={originalTooltip}
              altOne="Opteo custom design system tooltip"
              altTwo="Original amCharts tooltip"
              labelOne="Custom"
              labelTwo="Default"
            />
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Consistent theming and responsive behaviour
            </h3>
            <p className={slideStyles.contentParagraph}>
              All chart components share a unified theming system, accepting
              colour palettes, typography tokens, and spacing values directly
              from the design token layer. Charts automatically adapt tick
              density, label truncation, and legend layout based on container
              width, making them safe to drop into any dashboard layout.
            </p>
          </div>
        </div>
      </Slide>

      <Slide id="slide-number-input">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Number Input</p>
          <h2 className={slideStyles.title}>A deceptively complex primitive</h2>
        </hgroup>
        <p className={slideStyles.body}>
          A number input sounds simple — but building one that handles locale
          formatting, keyboard interactions, accessibility, and validation
          across all browsers turned out to be one of the most challenging
          components in the system.
        </p>
        <div className={slideStyles.contentBody} style={{ marginTop: "1.5em" }}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Exploration and edge cases
            </h3>
            <p className={slideStyles.contentParagraph}>
              I explored several approaches, from a simplified controlled input
              to a fully-featured component supporting range limits, step
              controls, suffix/prefix units, and custom formatting. The final
              design settled on a single input with stepper buttons, a clear
              button, and configurable validation rules.
            </p>
            {/* TODO: add number input image */}
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Solving cross-browser quirks
            </h3>
            <p className={slideStyles.contentParagraph}>
              The native <code>&lt;input type=&quot;number&quot;&gt;</code> was
              quickly ruled out due to inconsistent browser behaviour — Firefox
              allows any character, Safari strips invalid values silently, and
              Chrome fires input events differently. I opted for a text-based
              input with a custom parsing and formatting layer, ensuring
              predictable behaviour across all environments.
            </p>
            <p className={slideStyles.contentParagraph}>
              The component respects locale-specific formatting — using the
              correct decimal and grouping separators — while maintaining a
              stable numeric value in the background. Keyboard-only users can
              increment and decrement values using native step controls styled
              to match the system, and validation errors are announced to screen
              readers via live regions.
            </p>
          </div>
        </div>
      </Slide>

      <Slide id="slide-color-picker">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Color Picker</p>
          <h2 className={slideStyles.title}>
            Accessible, precise colour selection
          </h2>
        </hgroup>
        <p className={slideStyles.body}>
          The product needed a colour picker that could be embedded directly
          into tables, forms, and toolbars — not as a separate modal or dialog.
          This constraint drove the design toward a compact, inline component
          that expanded on demand.
        </p>
        <div className={slideStyles.contentBody} style={{ marginTop: "1.5em" }}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Designing for density and interaction
            </h3>
            <p className={slideStyles.contentParagraph}>
              The picker consists of a swatch button that shows the current
              colour and opens a popover with the full interface. The popover
              includes a hue slider, a saturation-lightness area, hex and RGB
              inputs, and a grid of predefined swatches. The entire component
              supports:
            </p>
            <ul className={slideStyles.contentParagraph}>
              <li>Hex, RGB, and HSL input formats with live parsing</li>
              <li>Arrow-key fine-tuning on the saturation-lightness grid</li>
              <li>Arrow-key hue adjustment with shift held for larger steps</li>
              <li>Eye-dropper integration where supported by the browser</li>
            </ul>
            {/* TODO: add color picker image */}
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              High-contrast preview
            </h3>
            <p className={slideStyles.contentParagraph}>
              One subtle but important feature is the built-in WCAG contrast
              check. When a foreground and background colour are available —
              such as when picking a text colour inside a table cell — the
              picker displays a live contrast ratio and a pass/fail badge at the
              relevant AA or AAA level. This helps users make accessible colour
              choices without leaving their workflow.
            </p>
          </div>
        </div>
      </Slide>
    </ProjectLayout>
  );
}
