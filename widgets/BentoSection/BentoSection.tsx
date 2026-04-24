import { BentoCard } from "@shared/ui/BentoCard"
import styled from "./BentoSection.module.scss"

export const BentoSection = () => {
  return (
    <section className={styled.BentoSection}>
      <div className={styled.BentoSection__1}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1.5" fill="#7F77DD"></rect><rect x="10" y="2" width="6" height="6" rx="1.5" fill="#7F77DD" opacity="0.4"></rect><rect x="2" y="10" width="6" height="6" rx="1.5" fill="#7F77DD" opacity="0.4"></rect><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#7F77DD" opacity="0.2"></rect></svg>
          }
          domain={"components"}
          title={"browse & install components"}
          description={"Explore community-built UI components. Filter by framework, download a ready bundle and drop it straight into your node_modules."}
          linkText={"browse components"}
          linkTo={"/components"}
          extra={
            <div className={styled.BentoSection__TagContainer}>
              <span className={styled.BentoSection__Tag}>React</span>
              <span className={styled.BentoSection__Tag}>Vue</span>
              <span className={styled.BentoSection__Tag}>Angular</span>
            </div>
          }
        />
      </div>

      <div className={styled.BentoSection__2}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v14M2 9h14" stroke="#7F77DD" stroke-width="1.5" stroke-linecap="round"></path></svg>
          }
          domain={"publish"}
          title={"upload your component"}
          description={"Share what you've built. We compile it into a standalone bundle — others can install it just like any npm package."}
          linkText={"publish component"}
          linkTo={"/components/create"}
          backgroundColor="#EEEDFE"
          backgroundIconColor="#ffffff"
          color="#534AB7"
        />
      </div>

      <div className={styled.BentoSection__3}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="#1D9E75" stroke-width="1.2"></circle><path d="M6 9l2 2 4-4" stroke="#1D9E75" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          }
          domain={"builds"}
          title={"monitor builds"}
          linkText={"view all builds"}
          linkTo={"/builds"}
          backgroundIconColor="#EAF3DE"
          extra={
            <div className={styled.BentoSection__TagContainer} style={{flexDirection: "column" }}>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  datepicker v2.1
                </span>
                <span style={{color: "#B4B2A9"}}>pending</span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--yellow`]}`} />
                  toast v0.3
                </span>
                <span style={{color: "#EF9F27"}}>in_progress</span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--green`]}`} />
                  button v11.7
                </span>
                <span style={{color: "#1D9E75"}}>completed</span>
              </div>
            </div>
          }
        />
      </div>

      <div className={styled.BentoSection__4}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="#7F77DD" stroke-width="1.2"></rect><path d="M2 7h14" stroke="#7F77DD" stroke-width="1.2"></path><path d="M6 11h6" stroke="#7F77DD" stroke-width="1.2" stroke-linecap="round"></path></svg>
          }
          domain={"repositories"}
          title={"collect components into repositories"}
          description={"Group related components into a single repository. Download the whole set as one bundle — install it as a full mini-library in your project. Perfect for design systems and shared component collections across teams."}
          linkText={"open repositories"}
          linkTo={"/repositories"}
          backgroundColor="#EEEDFE"
          backgroundIconColor="#ffffff"
          color="#534AB7"
        />
      </div>

      <div className={styled.BentoSection__5}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="#7F77DD" stroke-width="1.2"></circle><path d="M3 15c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#7F77DD" stroke-width="1.2" stroke-linecap="round"></path></svg>
          }
          domain={"my components"}
          title={"manage what you've published"}
          description={"Edit, update versions and track download stats for components you've published. See how the community uses your work."}
          linkText={"open repositories"}
          linkTo={"/repositories"}
        />
      </div>

      <div className={styled.BentoSection__6}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L11.5 7H16L12.5 10.5L14 15.5L9 12.5L4 15.5L5.5 10.5L2 7H6.5L9 2Z" stroke="#BA7517" stroke-width="1.2" stroke-linejoin="round"></path></svg>
          }
          domain={"trending"}
          title={"most downloaded this week"}
          linkText={"see all"}
          linkTo={"/components"}
          backgroundIconColor="#FAEEDA"
          extra={
            <div className={styled.BentoSection__TagContainer} style={{flexDirection: "column" }}>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  CommandMenu
                </span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  Modal
                </span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  Form
                </span>
              </div>
            </div>
          }
        />
      </div>

      <div className={styled.BentoSection__7}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4h10M4 8h7M4 12h5" stroke="#7F77DD" stroke-width="1.3" stroke-linecap="round"></path></svg>
          }
          domain={"docs"}
          title={"documentation"}
          description={"Learn how to publish, build and install components. Explore the API reference for CI/CD integration."}
          linkText={"read the docs"}
          linkTo={"/docs"}
        />
      </div>

      <div className={styled.BentoSection__8}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9l3 3 5-5" stroke="#7F77DD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          }
          domain={"get started"}
          title={"new here?"}
          description={"To publish your components and manage repositories, you need to create your own account."}
          linkText={"try now"}
          linkTo={"/registration"}
          backgroundColor="#EEEDFE"
          backgroundIconColor="#ffffff"
          color="#534AB7"
        />
      </div>
    </section>
  )
}
