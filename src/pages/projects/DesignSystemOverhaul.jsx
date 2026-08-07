import { ProjectLayout } from "../../components/ProjectLayout";
import { Slide } from "../../components/Slide";
import { CompareSlider } from "../../components/CompareSlider";
import { CaseStudyImage } from "../../components/CaseStudyImage";
import { PROJECTS } from "../../data/projects";
import lineChartLight from "../../assets/project-design-system-overhaul/line-chart-light.png";
import lineChartDark from "../../assets/project-design-system-overhaul/line-chart-dark.png";
import lineChartContainedLight from "../../assets/project-design-system-overhaul/line-chart-contained-light.png";
import lineChartContainedDark from "../../assets/project-design-system-overhaul/line-chart-contained-dark.png";
import originalTooltip from "../../assets/project-design-system-overhaul/origina_amcharts_tooltip.png";
import colorPickerInContext from "../../assets/project-design-system-overhaul/color-picker-in-context.png";
import multiSeriesTooltip from "../../assets/project-design-system-overhaul/contained-line-multi-series-tooltip.png";
import slideStyles from "../../components/Slide.module.css";

const project = PROJECTS.find((p) => p.slug === "design-system-overhaul");

export function OpteoDesignSystemOverhaul() {
  return (
    <ProjectLayout project={project}>
      <Slide id="slide-charts">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Example #1</p>
          <h2 className={slideStyles.title}>
            Performant and Responsive Charts
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
              itemOne={multiSeriesTooltip}
              itemTwo={originalTooltip}
              altOne="Custom multi-series tooltip"
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
          <p className={slideStyles.sectionHeader}>Example #2</p>
          <h2 className={slideStyles.title}>Formatted Number Input</h2>
        </hgroup>
        <p className={slideStyles.body}>
          A number input sounds simple — but building one that handles locale
          formatting, keyboard interactions, accessibility, and validation
          across all browsers turned out to be one of the most challenging
          components in the system.
        </p>
        <div className={slideStyles.contentBody} style={{ marginTop: "1.5em" }}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>Masking approach</h3>
            <p className={slideStyles.contentParagraph}>
              We considered the <code>vue-number-format</code> library, which
              shares much of our intended functionality, but settled on{" "}
              <code>maska</code> with a custom implementation for two reasons:
              <code>maska</code> is lightweight with zero dependencies, and
              building our own layer on top of it let us keep number input and
              display consistent across the application using the same internal
              number utility functions. This customized implementation also
              allowed us to integrate directly with our form validation
              pipeline.
            </p>
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Solving cross-browser quirks
            </h3>
            <p className={slideStyles.contentParagraph}>
              The native <code>&lt;input type=&quot;number&quot;&gt;</code> was
              quickly ruled out due to inconsistent browser behaviour — Firefox
              allows any character, Safari strips invalid values, and Chrome
              fires input events differently. I opted for a text-based input
              with a custom parsing and formatting layer, ensuring predictable
              behaviour across all environments.
            </p>
            <p className={slideStyles.contentParagraph}>
              The component respects locale-specific formatting — using the
              correct decimal and grouping separators — while maintaining a
              stable numeric value in the background.
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
          The choice of a simpler, pared down color picker is intentional: in
          our app's context, the slider comes in mostly when a user picks a
          color to represent a specific advertising account in their portfolio.
          Therefore, it doesn't require the kind of fine-grained control a user
          would need in a design or artistic creation context, for example. What
          matters here is <strong>simplicity, elegance, and ease of use</strong>
          .
          <br />
          <br />
          In the previous version of the app, users could pick one of five
          pre-set colors. In this new design, we provided eight presets and the
          ability to pick a custom color, or paste a custom hex code. The latter
          option is particularly neat for cases where users might want to use an
          account's specific brand color.
          <br />
        </p>
        <CaseStudyImage
          src={colorPickerInContext}
          alt="Color picker in context within a table cell"
          maxWidth={300}
        />
        <div className={slideStyles.contentBody} style={{ marginTop: "1.5em" }}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Reshaping a third-party library
            </h3>
            <p className={slideStyles.contentParagraph}>
              We built on top of <code>vue-accessible-color-picker</code>. Using{" "}
              <code>:deep()</code> selectors, I stripped out the alpha slider
              and secondary inputs — we only needed the hue slider and the color
              space. The slider thumbs and tracks were restyled from scratch,
              with separate vendor-prefixed rules for Firefox, which otherwise
              ignores the standard custom slider styling.
            </p>
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>Token-driven presets</h3>
            <p className={slideStyles.contentParagraph}>
              Eight preset colours (from Purple to Pink) are sourced directly
              from the design token layer. When brand colours change upstream,
              the picker&apos;s preset grid updates automatically. The preset
              buttons are built from scratch using the same focus ring mixins
              and other design tokens as every other interactive element in the
              system.
            </p>
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Choosing not to generalise
            </h3>
            <p className={slideStyles.contentParagraph}>
              Unlike every other input in the system, the colour picker handles
              its own validation internally and communicates solely through{" "}
              <code>v-model</code>. Colour values have fundamentally different
              validation semantics than numeric or text inputs. Forcing them
              into the generic form validator would have added complexity
              without benefit. An example of knowing when a pattern
              shouldn&apos;t be applied.
            </p>
          </div>
        </div>
      </Slide>
    </ProjectLayout>
  );
}
