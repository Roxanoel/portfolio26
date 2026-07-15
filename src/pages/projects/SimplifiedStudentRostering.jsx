import { ProjectLayout } from "../../components/ProjectLayout";
import { Slide } from "../../components/Slide";
import { PROJECTS } from "../../data/projects";
import rosteringFlowchart from "../../assets/project-rostering/add_new_student.png";
import styles from "./SimplifiedStudentRostering.module.css";
import slideStyles from "../../components/Slide.module.css";

const project = PROJECTS.find((p) => p.slug === "simplified-student-rostering");

export function SimplifiedStudentRostering() {
  return (
    <ProjectLayout project={project}>
      <Slide id="slide-problem">
        <hgroup>
          <p className={slideStyles.sectionHeader}>The Problem</p>
          <h2 className={slideStyles.title}>Tackling onboarding attrition</h2>
        </hgroup>
        <p className={slideStyles.body}>
          While working at a small non-profit edtech company, I was tasked with
          improving user retention during our onboarding process.
        </p>
      </Slide>

      <Slide id="slide-discovery">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Discovery</p>
          <h2 className={slideStyles.title}>Finding the friction point</h2>
        </hgroup>
        <p className={slideStyles.body}>
          In order to identify friction points, I built a funnel visualisation
          of the onboarding process, with active user data at each stage. Based
          on this quantitative data as well as an analysis of customer support
          tickets, student rostering was identified as the main friction point
          to address. Given the clear dominance of the rostering problem, we
          left aside other, comparatively smaller friction points like staff
          rostering and setting up a school calendar.
        </p>
        <div className={styles.stats}>
          <figure className={styles.stat}>
            <span className={styles.statValue}>74%</span>
            <figcaption className={styles.statLabel}>
              Of onboarding attrition happening at the rostering stage
            </figcaption>
          </figure>
          <figure className={styles.stat}>
            <span className={styles.statValue}>1/3</span>
            <figcaption className={styles.statLabel}>
              Of customer support tickets asking for help with rostering
            </figcaption>
          </figure>
        </div>
      </Slide>

      <Slide id="slide-defining">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Defining the problem</p>
          <h2 className={slideStyles.title}>Identifying action points</h2>
        </hgroup>
        <div className={styles.slideContent}>
          <p className={slideStyles.body}>
            In order to determine the exact friction points and opportunities
            for improvement in our onboarding process, I analysed pain points
            from customer support calls, performed a competitor audit, and
            coordinated with our CTO to examine our options with our existing
            integrations.
          </p>
          <div className={styles.definingContent}>
            <h3 className={styles.definingHeading}>A long, unoptimized form</h3>
            <p className={styles.definingText}>
              The existing rostering process only had two options: uploading a
              CSV based on a provided model, or manually rostering each
              individual student using a form similar to the one pictured here.
            </p>
            <img
              src={rosteringFlowchart}
              alt="Form to add a new student"
              className={styles.definingImage}
            />
            <p className={styles.definingText}>
              The CSV template worked for more tech-savvy users, but individual
              teachers and counselors used the manual rostering option in the
              vast majority of cases.
            </p>
            <p className={styles.definingText}>
              The form asked for a lot of information about students. While
              useful, this information is not strictly necessary to get up and
              running, and a majority of users might not need it at all, based
              on usage data.
            </p>
            <p className={styles.definingText}>
              Based on this information, I identified two priorities for the
              improved rostering flow:
            </p>
            <ul className={styles.definingText}>
              <li>
                Require only the strict minimum of information to get started
              </li>
              <li>
                Instead of filling each form one by one, users should be able to
                batch-roster students in one simple, in-app process
              </li>
            </ul>
          </div>
          <div className={styles.definingContent}>
            <h3 className={styles.definingHeading}>New Opportunities</h3>
            <p className={styles.definingText}>
              I had extensive discussions with our CTO in order to determine
              what could be done to better use our existing identity platform
              integrations, and evaluating some findings of our competitor audit
              to determine feasibility and appetite. We agreed on the following
              action points:
            </p>
            <ol className={styles.actionList}>
              <li className={styles.actionItem}>
                <strong>Create an easy sync wizard </strong>for users
                authenticated through the identity platform
              </li>
              <li className={styles.actionItem}>
                <strong>Enable student-led rostering</strong> as an option,
                where suitable
              </li>
            </ol>
          </div>
        </div>
      </Slide>

      <Slide id="slide-ideating">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Ideating</p>
          <h2 className={slideStyles.title}>Mapping the flow</h2>
        </hgroup>
        <p className={slideStyles.body}>
          Collaborating with the CTO and our customer success manager, I started
          by outlining the flows and options we wanted to support as a
          flowchart, mapping out the necessary steps and deliverables.
        </p>
        <p className={slideStyles.body}>
          In parallel, I consulted the documentation for our identity platform
          integrations to examine the JSON data the APIs returned, ensuring my
          designs wouldn't be built on wrong assumptions about what kind of data
          we had to play with. I also had our CTO run some tests to get an idea
          of the waiting times I could expect when fetching from these APIs.
        </p>
      </Slide>

      <Slide id="slide-iterating">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Iterating</p>
          <h2 className={slideStyles.title}>
            From mockups to working prototype
          </h2>
        </hgroup>
        <p className={slideStyles.body}>
          Based on the flowchart and information we collected, I started
          building higher fidelity mockups of the screens at each stage,
          exploring a few different options. Throughout the process, we held
          team feedback sessions to refine the designs.
        </p>
        <p className={slideStyles.body}>
          For our integrations, I built a quick code prototype using Claude so
          the CTO and I could test what the interactions and loading states felt
          like in practice, plugged into the real API, to make design decisions
          in consequence. We did a few rounds of internal testing to refine the
          design.
        </p>
      </Slide>

      <Slide id="slide-integration">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Integration</p>
          <h2 className={slideStyles.title}>
            Identity platform & classroom codes
          </h2>
        </hgroup>
        <p className={slideStyles.body}>
          I explored various concepts to display different states of syncing
          classrooms, based on API response content.
        </p>
        <p className={slideStyles.body}>
          A URL works better for a message sent to students, while a code works
          better for displaying on a projector, so it made sense to support
          both. I also wanted to make it easy for our users to quickly copy the
          code, and couldn't rely on an icon-only button based on my knowledge
          of our user base which tends to find icon-only buttons difficult to
          understand.
        </p>
      </Slide>

      <Slide id="slide-delivering">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Developing & Delivering</p>
          <h2 className={slideStyles.title}>Shipping the solution</h2>
        </hgroup>
        <p className={slideStyles.body}>
          Once I met with our project manager to determine the options we wanted
          to build, the CTO and I divided the engineering tasks between the two
          of us.
        </p>
        <p className={slideStyles.subheading}>Some of my tasks:</p>
        <ul className={styles.taskList}>
          <li className={styles.taskItem}>Implementing all visual designs</li>
          <li className={styles.taskItem}>
            Creating components for the new classroom code flow
          </li>
          <li className={styles.taskItem}>
            Writing unit tests for the different rostering options
          </li>
          <li className={styles.taskItem}>
            Implementing the multi-step rostering wizard and ensuring users
            don't lose unsaved work if they accidentally navigate away from the
            flow
          </li>
        </ul>
      </Slide>

      <Slide id="slide-impact">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Impact</p>
          <h2 className={slideStyles.title}>Early results</h2>
        </hgroup>
        <p className={slideStyles.body}>
          The true impact of the new rostering flow will only be possible to
          fully evaluate at the next school year start, given the high
          seasonality of the product.
        </p>
        <p className={slideStyles.body}>
          However, early results are encouraging: customer support reported
          significantly less tickets asking for help with rostering, and much
          simpler requests in the few remaining cases. Our improved integration
          also allowed us to position ourselves to use any identity solution in
          the future.
        </p>
      </Slide>
    </ProjectLayout>
  );
}
