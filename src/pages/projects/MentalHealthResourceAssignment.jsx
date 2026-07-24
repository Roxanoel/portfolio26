import { ProjectLayout } from "../../components/ProjectLayout";
import { Slide } from "../../components/Slide";
import { CaseStudyImage } from "../../components/CaseStudyImage";
import { PROJECTS } from "../../data/projects";
import multiStepAltSkeleton from "../../assets/project-resources/multi-step-alt-skeleton.png";
import multiStepWizardSkeleton from "../../assets/project-resources/multi-step-wizard-skeleton.png";
import skeletonSinglePage from "../../assets/project-resources/skeleton-single-page.png";
import explorationsResources from "../../assets/project-resources/explorations-resources.png";
import solutionResourceRecommendation from "../../assets/project-resources/solution-resource-recommendation.png";
import slideStyles from "../../components/Slide.module.css";

const project = PROJECTS.find(
  (p) => p.slug === "mental-health-resource-assignment",
);

export function MentalHealthResourceAssignment() {
  return (
    <ProjectLayout project={project}>
      <Slide id="slide-problem">
        <hgroup>
          <p className={slideStyles.sectionHeader}>The Problem</p>
          <h2 className={slideStyles.title}>Access to care is fragmented</h2>
        </hgroup>
        <p className={slideStyles.body}>
          Daily emotional check-ins were already helping our users detect
          struggling students. But most students don't necessarily need, or even
          want, adult intervention — they just need a bit of guidance to
          navigate everyday challenges. Singling students out for every concern
          annoys them, and manually following up with everyone is unsustainable
          for teachers.
        </p>
        <br />
        <p className={slideStyles.body}>
          To simplify interventions, we had created{" "}
          <strong>mental health resources</strong> students could access on
          their own and which serve as an appropriate first line of support for
          the majority of needs surfaced.
        </p>
        <br />
        <p className={slideStyles.body}>
          However, a critical piece was still missing: the{" "}
          <strong>bridge between detection and action</strong>. How could we
          make it easy for teachers to go from "a need was surfaced" to
          "something was done about it"?
        </p>
      </Slide>

      <Slide id="slide-defining">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Defining the solution</p>
          <h2 className={slideStyles.title}>A smart assignment flow</h2>
        </hgroup>
        <p className={slideStyles.body}>
          I identified two natural contexts in which an educator would think of
          recommending a resource: reviewing a student's check-in and thinking{" "}
          <strong>"this student could benefit from some help"</strong>, or
          browsing resources and thinking{" "}
          <strong>"this would be helpful for some of my students"</strong>.
        </p>
        <p className={slideStyles.body}>
          This led to the decision to build a single assignment flow with two
          context-aware entry points, using URL params to pre-fill based on
          where the educator is coming from — so they never have to start from
          scratch.
        </p>
      </Slide>

      <Slide id="slide-ideating">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Ideating</p>
          <h2 className={slideStyles.title}>Exploring structure and flow</h2>
        </hgroup>
        <p className={slideStyles.body}>
          Before diving into design, I needed to separate what was already clear
          from what still needed to be figured out.
        </p>
        <h3 className={slideStyles.contentHeading}>What we knew</h3>
        <ul className={slideStyles.body}>
          <li>
            The flow must include <strong>student selection</strong>,{" "}
            <strong>resource selection</strong>, and a way to write an{" "}
            <strong>optional message</strong>.
          </li>
          <li>
            It also needed to me <strong>minimally disruptive</strong>, allowing
            users to promptly return to what they were doing before making a
            recommendation.
          </li>
        </ul>
        <h3 className={slideStyles.contentHeading}>What we needed to answer</h3>
        <ul className={slideStyles.body}>
          <li>
            Should the steps be presented <strong>all on one page</strong> or
            broken into a <strong>step-by-step wizard</strong>?
          </li>
          <li>
            Should the flow live on a <strong>dedicated page</strong> or in a{" "}
            <strong>modal</strong>?
          </li>
          <li>
            How should the assignment process handle cases where a resource is
            already selected, or a student is already chosen?
          </li>
        </ul>
        <br />
        <div className={slideStyles.contentBody}>
          <h3 className={slideStyles.contentHeading}>
            Multi-step wizard skeleton
          </h3>
          <p className={slideStyles.contentParagraph}>
            I started by exploring flow options which broke down the process
            into three distinct steps, allowing users to first select a student,
            then an activity, and finally get to review their selection with the
            option of adding a custom note. This first flow was meant to appear
            as a modal, inspired by install wizards and other such processes
            with an easy way to track progress on the left. The vast majority of
            our users only desktop/laptop devices, but the difficulty of making
            this design responsive made me want to explore a one-column layout.
          </p>
          <CaseStudyImage
            src={multiStepWizardSkeleton}
            alt="Multi-step wizard skeleton layout"
          />
          <h3 className={slideStyles.contentHeading}>
            Multi-step alternative skeleton
          </h3>
          <p className={slideStyles.contentParagraph}>
            I looked at a single-column layout, which is easier to adapt to
            smaller screens. However, as I was playing around with the flow in a
            prototype, I ran into an issue. Because the user enters the flow
            either knowing which student they want to recommend to, or which
            activity will be the object of the recommendation, autocompleting
            that step from the URL params made one step of the flow feel
            superfluous. I tried skipping it when prefilled, but that just
            created potential confusion especially with the steps tracker and
            the summary at the end.
          </p>
          <CaseStudyImage
            src={multiStepAltSkeleton}
            alt="Multi-step alternative skeleton layout"
          />
          <h3 className={slideStyles.contentHeading}>Single-page skeleton</h3>
          <p className={slideStyles.contentParagraph}>
            In the end, I opted to have all the information on one screen: this
            worked better with the autocompletion from URL params, and felt
            minimally disruptive to the user's work flow. The main challenge was
            to maintain simplicity and prevent information overload, while
            allowing users to dig a bit more as needed.
          </p>
          <CaseStudyImage
            src={skeletonSinglePage}
            alt="Single-page skeleton layout"
          />
        </div>
      </Slide>

      <Slide id="slide-iterating">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Iterating</p>
          <h2 className={slideStyles.title}>
            From wireframes to high-fidelity mockups
          </h2>
        </hgroup>
        <p className={slideStyles.body}>
          Once we were confident with the overall structure of the flow, I
          started fleshing out the components of the design. Below is just a
          sample of some of the main action items I worked through.
        </p>
        <br />
        <div className={slideStyles.contentBody}>
          <h3 className={slideStyles.contentHeading}>
            Exploring resource assignment UI
          </h3>
          <p className={slideStyles.contentParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </p>
          <CaseStudyImage
            src={explorationsResources}
            alt="Explorations of resource assignment interfaces"
          />
        </div>
      </Slide>

      <Slide id="slide-delivering">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Developing & Delivering</p>
          <h2 className={slideStyles.title}>Shipping the solution</h2>
        </hgroup>
        <p className={slideStyles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <br />
        <div className={slideStyles.contentBody}>
          <h3 className={slideStyles.contentHeading}>
            Resource recommendation solution
          </h3>
          <p className={slideStyles.contentParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <CaseStudyImage
            src={solutionResourceRecommendation}
            alt="Final resource recommendation solution"
          />
        </div>
      </Slide>

      <Slide id="slide-impact">
        <hgroup>
          <p className={slideStyles.sectionHeader}>Impact</p>
          <h2 className={slideStyles.title}>Early results</h2>
        </hgroup>
        <p className={slideStyles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <br />
        <p className={slideStyles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur.
        </p>
      </Slide>
    </ProjectLayout>
  );
}
