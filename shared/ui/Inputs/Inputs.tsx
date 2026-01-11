import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react"
import styles from './Inputs.module.scss'

interface BaseInputProps {
  label: string
  error?: string
}

interface InputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  const fieldClasses = [
    styles.Input__field,
    styles.Input__field_text,
    error && styles.Input__field_error,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id} className={styles.Input__label}>
        {label}
      </label>
      <input 
        {...props} 
        className={fieldClasses}
      />
      {error && <div className={styles.Input__error}>{error}</div>}
    </div>
  )
}

interface TextareaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ label, error, className, ...props }: TextareaProps) => {
  const fieldClasses = [
    styles.Input__field,
    styles.Input__field_textarea,
    error && styles.Input__field_error,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id} className={styles.Input__label}>
        {label}
      </label>
      <textarea 
        {...props} 
        className={fieldClasses}
      />
      {error && <div className={styles.Input__error}>{error}</div>}
    </div>
  )
}

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends BaseInputProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  options: SelectOption[]
}

export const Select = ({ label, error, options, className, ...props }: SelectProps) => {
  const fieldClasses = [
    styles.Input__field,
    styles.Input__field_select,
    error && styles.Input__field_error,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id} className={styles.Input__label}>
        {label}
      </label>
      <select {...props} className={fieldClasses}>
        <option value="">Выберите опцию</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className={styles.Input__error}>{error}</div>}
    </div>
  )
}

interface CheckboxProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = ({ label, error, className, ...props }: CheckboxProps) => {
  const wrapperClasses = [
    styles.Input,
    styles.Input_checkbox,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>
      <label className={styles.Input__checkboxLabel}>
        <input 
          type="checkbox" 
          className={styles.Input__checkbox}
          {...props} 
        />
        <span className={styles.Input__checkboxText}>{label}</span>
      </label>
      {error && <div className={styles.Input__error}>{error}</div>}
    </div>
  )
}
