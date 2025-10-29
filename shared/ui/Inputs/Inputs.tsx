import styled from "./Inputs.module.scss";

type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const BaseInput = ({ label, ...props }: BaseInputProps) => {

  return (
    <div className={styled.InputWrapper}>
      <label className={styled.InputsLabel}>
        {label}
      </label>
      <input className={styled.BaseInput} {...props} title={label} />
    </div>
  );
};
