import { Link } from "react-router";
import styled from "./welcome.module.scss"
import { BentoSection } from "@widgets/BentoSection";

export function Welcome() {
  return (
    <main className={styled.Welcome}>
      <div className={styled.Welcome__Hero}>
        <h5 className={styled.Welcome__Domain}>
          // component registry
        </h5>
        <h1 className={styled.Welcome__Title}>
          Your components. <br />
          <span>Without the bloat.</span>
        </h1>
        <p className={styled.Welcome__About}>
          Publish, discover and install individual UI components — no full UI kit required. 
          Just the parts you actually need.
        </p>
      </div>
      <BentoSection />
    </main>
  );
}
