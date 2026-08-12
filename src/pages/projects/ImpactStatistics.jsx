import { ProjectLayout } from "../../components/ProjectLayout";
import { Slide } from "../../components/Slide";
import { CaseStudyImage } from "../../components/CaseStudyImage";
import { Legend } from "../../components/Legend";
import { PROJECTS } from "../../data/projects";
import framedOverview from "../../assets/project-impact-statistics/framed-overview.png";
import dateRangeSwitcher from "../../assets/project-impact-statistics/date-range-switcher.png";
import costSavingsSection from "../../assets/project-impact-statistics/cost-savings-section.png";
import costSavingsBreakdown from "../../assets/project-impact-statistics/cost-savings-breakdown.png";

import slideStyles from "../../components/Slide.module.css";

const project = PROJECTS.find((p) => p.slug === "impact-statistics");

export function ImpactStatistics() {
  return (
    <ProjectLayout project={project}>
      <Slide id="slide-problem">
        <hgroup>
          <p className={slideStyles.sectionHeader}>The Problem</p>
          <h2 className={slideStyles.title}>What we were asked</h2>
        </hgroup>
        <p className={slideStyles.body}>
          Larger clients were increasingly asking for a way to keep an eye on
          how their team was using our performance advertising optimization app, where the tool was bringing the most
          value across their portfolio, and which accounts might benefit from a
          bit more attention. I was tasked with creating a dashboard that
          presented this data in a clear and actionable way.
        </p>
        <br />
        <p className={slideStyles.body}>
          Beyond serving clients, the dashboard had a clear internal use case:
          our customer success team needed a way to{" "}
          <strong>demonstrate value</strong> during demos and convert prospects
          into paying customers by showing them what the tool had already
          done for them.
        </p>
      </Slide>

      <Slide id="slide-defining">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Defining the solution</p>
          <h2 className={slideStyles.title}>Three goals, one dashboard</h2>
        </hgroup>
        <p className={slideStyles.body}>
          The pitch was straightforward: give users a way to{" "}
          <strong>monitor app usage</strong>, and give the business a way to{" "}
          <strong>make its value clear</strong>. That broad goal broke down into
          three concrete needs.
        </p>
        <br />
        <ol className={slideStyles.body}>
          <li>
            <strong>See which actions are most valuable.</strong> Users need to
            be able to see what the most valuable actions they take in the app
            are, so they can make informed decisions.
          </li>
          <li>
            <strong>Spot opportunities across accounts.</strong> Users need to be
            able to monitor across their accounts to see where there might be
            room for improvement.
          </li>
          <li>
            <strong>Monitor team activity.</strong> Users need to be able to
            monitor team activity and quickly see who is doing what.
          </li>
        </ol>
        <br />
        <p className={slideStyles.body}>
          Behind these goals sat a few clear buckets of data: team usage stats
          (the improvements pushed, reports created, and other activity, broken
          down per member), cost savings per account, cost savings per action,
          and time savings per account and per action — the last one notoriously
          harder to measure, yet frequently requested by team managers.
        </p>
      </Slide>

      <Slide id="slide-valuable-actions">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Valuable actions</p>
          <h2 className={slideStyles.title}>Value at a glance</h2>
        </hgroup>
        <p className={slideStyles.body}>
          The first need was helping users see the value of the app and identify
          their highest-value actions, so they can make informed decisions.
        </p>
        <br />
        <div className={slideStyles.contentBody}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              An overview as the cliff notes
            </h3>
            <p className={slideStyles.contentParagraph}>
              I opened with an overview section to give a quick overview of the three main metrics our users cared most about. A headline figure set the scene, and
              a breakdown by action type let users quickly understand the most
              impactful actions they have taken in the app.
            </p>
          </div>
          <div className={slideStyles.contentGroup}>
            <Legend caption="The overview section acting as the cliff notes, with a headline figure and a breakdown by action type.">
              <CaseStudyImage
                src={framedOverview}
                alt="Overview dashboard showing a headline value figure and a breakdown by action type"
              />
            </Legend>
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>Choosing the time periods</h3>
            <p className={slideStyles.contentParagraph}>
              In the mockup presented above, the user is viewing their statistics for "All Time". However,
              they could also pick "Last 30 days" or "Last 90 days" as their interval of preference. We
              explored using a date picker to allow users to select custom date ranges, but in the end,
              most users were interested in roughly seeing the last month or the last quarter. The added complexity
              was not a worthy tradeoff for our users above the the simple, 3-options switcher. Most importantly,
              this choice led to <strong>improved performance</strong>: knowing in advance which ranges are possible
              enabled us to <strong>pre-fetch</strong> the data in the background, so the user never had to wait for it to load.
            </p>
          </div>
          <Legend caption="Date range switcher, at the page level">
            <CaseStudyImage
              src={dateRangeSwitcher}
                alt="Date range switcher with three options: All Time, Last 30 days, and Last 90 days"
              />
          </Legend>
        </div>
      </Slide>

      <Slide id="slide-opportunities">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Opportunities</p>
          <h2 className={slideStyles.title}>Finding room for improvement</h2>
        </hgroup>
        <p className={slideStyles.body}>
          The second need was helping users monitor across their accounts to spot
          where there might be room for improvement.
        </p>
        <br />
        <div className={slideStyles.contentBody}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              Sections for each metric
            </h3>
            <p className={slideStyles.contentParagraph}>
              I gave each metric (cost, time, and alerts) its own section so
              users could dig deeper. Instead of breaking down by action type,
              as was done in the overview section, here we break down the impact
              data by account. This allows users to determine which accounts might
              benefit from more attention.
            </p>
          </div>
          <div className={slideStyles.contentGroup}>
            <Legend caption="The cost savings section, one of the sections for each kind of savings.">
              <CaseStudyImage
                src={costSavingsSection}
                alt="Cost savings section of the dashboard"
              />
            </Legend>
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>Broken down per account</h3>
            <p className={slideStyles.contentParagraph}>
              For each account, users can look at all of the actions that were taken,
              to see exactly what was done and when. Each row is presented in the
              same way as the improvements are shown in other pages of the app, and
              is clickable to take the user to view that improvement.
            </p>
          </div>
          <div className={slideStyles.contentGroup}>
            <Legend caption="Cost savings broken down per account.">
              <CaseStudyImage
                src={costSavingsBreakdown}
                alt="Cost savings broken down per account"
              />
            </Legend>
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              A deep dive into specific examples
            </h3>
            <p className={slideStyles.contentParagraph}>
              A detailed view modal let users see the specific examples behind the
              numbers for each account and metric, i.e. the actual improvements and reports that added up
              to each, so the statistics felt concrete rather than abstract.
            </p>
          </div>
        </div>
      </Slide>

      <Slide id="slide-team">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Team activity</p>
          <h2 className={slideStyles.title}>See who does what</h2>
        </hgroup>
        <p className={slideStyles.body}>
          The third goal — monitoring team activity — needed both a quick
          at-a-glance view and something more structured. Rather than forcing
          both into a single component, I kept them separate.
        </p>
        <br />
        <div className={slideStyles.contentBody}>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>
              A heatmap for the quick scan
            </h3>
            <p className={slideStyles.contentParagraph}>
              A heatmap gives managers a fast sense of activity patterns, with a
              switcher to toggle between the whole team and individual members.
              This answers the "who is doing what" question without requiring
              them to read a table.
            </p>
          </div>
          <div className={slideStyles.contentGroup}>
            <h3 className={slideStyles.contentHeading}>A table for the full team</h3>
            <p className={slideStyles.contentParagraph}>
              A table below lists the whole team and each member&apos;s activity.
              For now it is display-only, but it is a deliberate first step:
              keeping team features in their own space means future actions —
              assigning, reviewing, or comparing members — have a clear place to
              grow into, rather than being retrofitted into the heatmap.
            </p>
          </div>
        </div>
      </Slide>
    </ProjectLayout>
  );
}
