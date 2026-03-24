import type {
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  DragEvent,
  ChangeEvent
} from "react"
import { useState, useRef } from "react"
import styles from './Inputs.module.scss'
import { FiUpload, FiX, FiCheck, FiArchive } from "react-icons/fi"

interface BaseInputProps {
  label: string
  error?: string
  icon?: ReactElement<any, any>
}

interface InputProps extends BaseInputProps, InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ label, error, className, icon, ...props }: InputProps) => {
  const fieldClasses = [
    styles.Input__Field,
    styles['Input__Field--text'],
    error && styles['Input__Field--error'],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id} className={styles.Input__Label}>
        {icon ? icon : null} {label}
      </label>
      <div style={{display: 'flex'}}>
        <input 
          {...props} 
          className={fieldClasses}
        />
      </div>
      {error && <div className={styles.Input__Error}>{error}</div>}
    </div>
  )
}

interface TextareaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ label, error, className, icon, ...props }: TextareaProps) => {
  const fieldClasses = [
    styles.Input__Field,
    styles['Input__Field--textarea'],
    error && styles['Input__Field--error'],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id} className={styles.Input__Label}>
        {icon ? icon : null} {label}
      </label>
      <textarea 
        {...props} 
        className={fieldClasses}
      />
      {error && <div className={styles.Input__Error}>{error}</div>}
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

export const Select = ({ label, error, options, icon, className, ...props }: SelectProps) => {
  const fieldClasses = [
    styles.Input__Field,
    styles['Input__Field--select'],
    error && styles['Input__Field--error'],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.Input}>
      <label htmlFor={props.id} className={styles.Input__Label}>
        {icon ? icon : null} {label}
      </label>
      <select {...props} className={fieldClasses}>
        <option value="">Выберите опцию</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className={styles.Input__Error}>{error}</div>}
    </div>
  )
}

interface CheckboxProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = ({ label, error, className, ...props }: CheckboxProps) => {
  const wrapperClasses = [
    styles.Input,
    styles['Input--checkbox'],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>
      <label className={styles.Input__CheckboxLabel}>
        <input 
          type="checkbox" 
          className={styles.Input__Checkbox}
          {...props} 
        />
        <span className={styles.Input__CheckboxText}>{label}</span>
      </label>
      {error && <div className={styles.Input__Error}>{error}</div>}
    </div>
  )
}

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  label: string
  error?: string
  icon?: ReactElement
  value?: File | null
  onChange?: (file: File | null) => void
  acceptedFileTypes?: string[]
  maxSize?: number
}

export const FileInput = ({
  label,
  error,
  icon,
  value,
  onChange,
  acceptedFileTypes = ['.zip', '.rar', '.7z', '.tar', '.gz', '.tgz'],
  maxSize = 10 * 1024 * 1024,
  className,
  ...props
}: FileInputProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const validateFile = (file: File): string | null => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedFileTypes.includes(fileExtension)) {
      return `Допустимые форматы: ${acceptedFileTypes.join(', ')}`
    }
    if (file.size > maxSize) {
      return `Размер файла не должен превышать ${maxSize / (1024 * 1024)}MB`
    }
    return null
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const validationError = validateFile(file)
      if (validationError) {
        setFileError(validationError)
      } else {
        setFileError(null)
        onChange?.(file)
      }
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const validationError = validateFile(file)
      if (validationError) {
        setFileError(validationError)
      } else {
        setFileError(null)
        onChange?.(file)
      }
    }
    e.target.value = ''
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onChange?.(null)
    setFileError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleZoneClick = () => {
    if (value) return
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const wrapperClasses = [
    styles.FileInput,
    isDragging && styles['FileInput--dragging'],
    (error || fileError) && styles['FileInput--error'],
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperClasses}>
      <label className={styles.Input__Label}>
        {icon ? icon : <FiArchive />} {label}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        className={styles.FileInput__Input}
        onChange={handleFileSelect}
        accept={acceptedFileTypes.join(',')}
        {...props}
      />

      <div
        className={styles.FileInput__Dropzone}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleZoneClick}
      >
        {!value ? (
          <div className={styles.FileInput__Placeholder}>
            <FiUpload className={styles.FileInput__UploadIcon} />
            <div className={styles.FileInput__Title}>
              {isDragging ? 'Отпустите файл' : 'Перетащите архив или нажмите для выбора'}
            </div>
            <div className={styles.FileInput__Hint}>
              Допустимые форматы: {acceptedFileTypes.join(', ')}
            </div>
            <div className={styles.FileInput__Hint}>
              Максимальный размер: {maxSize / (1024 * 1024)}MB
            </div>
          </div>
        ) : (
          <div className={styles.FileInput__FileInfo}>
            <FiArchive className={styles.FileInput__FileIcon} />
            <div className={styles.FileInput__FileDetails}>
              <div className={styles.FileInput__FileName}>{value.name}</div>
              <div className={styles.FileInput__FileSize}>{formatFileSize(value.size)}</div>
            </div>
            <FiCheck className={styles.FileInput__CheckIcon} />
            <button
              type="button"
              className={styles.FileInput__RemoveButton}
              onClick={handleRemoveFile}
            >
              <FiX />
            </button>
          </div>
        )}
      </div>

      {(error || fileError) && (
        <div className={styles.Input__Error}>{error || fileError}</div>
      )}
    </div>
  )
}