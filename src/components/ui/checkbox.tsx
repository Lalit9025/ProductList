import React, { InputHTMLAttributes } from 'react'
import '../../styles/checkbox.css'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`checkbox-container ${className}`}>
      <input
        type="checkbox"
        className="checkbox-input"
        {...props}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  )
}

