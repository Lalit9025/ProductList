import React, { InputHTMLAttributes } from 'react'
import '../../styles/input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`input ${className}`}
      {...props}
    />
  )
}

