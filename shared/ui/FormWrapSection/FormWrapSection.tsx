import { FiArrowLeft } from "react-icons/fi"
import styled from "./FormWrapSection.module.scss"
import { useState, type ReactNode } from "react";
import { FormTipsButton } from "@shared/ui/FormTipsButton";
import { FormTipsPanel } from "@shared/ui/FormTipsPanel";
import { useNavigate } from "react-router";
import { Button } from "../Button";

interface FormWrapSectionProps {
  title: string;
  tipsTitle: string;
  tips: string[];
  children: ReactNode;
}

export const FormWrapSection = (props: FormWrapSectionProps) => {
  const navigate = useNavigate();
  const [showTips, setShowTips] = useState(false);

  return (
    <section className={styled.FormWrapSection}>
      <div className={styled.FormWrapSection__Header}>
        <Button variant="cancel" nonBlock onClick={() => navigate(-1)}>
          <FiArrowLeft /> Назад
        </Button>

        <h2>{props.title}</h2>

        <FormTipsButton
          onClick={() => setShowTips(!showTips)}
        />
      </div>

      <FormTipsPanel
        show={showTips}
        title={props.tipsTitle}
        tips={props.tips}
      />
      {props.children}
    </section>
  )
}