import { Link } from "react-router"
import styles from "./BentoCard.module.scss"
import type { ReactNode } from "react";

interface BentoCardProps {
  icon: ReactNode;
  domain: string;
  title: string;
  description?: string;
  extra?: ReactNode;
  linkText: string;
  linkTo: string;
  backgroundColor?: string;
  backgroundIconColor?: string;
  color?: string;
}

export const BentoCard = (props: BentoCardProps) => {
  return (
    <article className={styles.BentoCard} style={{background: props.backgroundColor ? props.backgroundColor : "#FFFFFF"}}>
      <div className={styles.BentoCard__Icon} style={{background: props.backgroundIconColor ? props.backgroundIconColor : "#EEEDFE"}}>
        {props.icon}
      </div>
      <div>
        <div className={styles.BentoCard__Domain} style={{color: props.color ? props.color : "#7a7a8a"}}>// {props.domain}</div>
        <div className={styles.BentoCard__Title} style={{color: props.color ? props.color : "#1a1825"}}>{props.title}</div>
      </div>
      <p className={styles.BentoCard__Description} style={{color: props.color ? props.color : "#4a4a5a"}}>
        {props.description}
      </p>
      <div className={styles.BentoCard__Extra}>
        {props.extra}
      </div>
      <Link to={props.linkTo} className={styles.BentoCard__Link}>{props.linkText}</Link>
    </article>
  )
}