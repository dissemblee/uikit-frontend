import { InfoRow } from "../InfoRow";

type ValuesType = string | number | null | undefined

export const InfoList = ({labels, values}: {labels: string[], values: ValuesType[]}) => {
  const rows = labels.map((label, i) => (
    <InfoRow key={i} label={label} value={values[i] ?? null} />
  ))

  return <>{rows}</>
};
