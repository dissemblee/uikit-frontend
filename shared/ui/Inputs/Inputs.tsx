import styled from "./Inputs.module.scss";

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const BaseInput = ({ label, ...props }: BaseInputProps) => {

  return (
    <div className={styled.Input_wrapper}>
      <label className={styled.Inputs__label}>
        {label}
      </label>
      <input className={styled.Inputs} {...props} title={label} />
    </div>
  );
};
