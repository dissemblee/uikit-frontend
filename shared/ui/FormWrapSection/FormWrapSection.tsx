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

  const highlightLastWord = (title: string) => {
    const words = title.split(" ");

    if (words.length === 1) {
      return <span>{title}</span>
    }

    const lastWord = words.pop()
    const restText = words.join(" ")

    return (
      <span>// {restText} <span className={styled.FormWrapSection__HighlightTitle}>{lastWord}</span> </span>
    )
  }

  return (
    <section className={styled.FormWrapSection}>
      <div className={styled.FormWrapSection__Header}>
        <Button variant="cancel" nonBlock onClick={() => navigate(-1)}>
          <FiArrowLeft /> назад
        </Button>

        <span>{highlightLastWord(props.title)}</span>

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