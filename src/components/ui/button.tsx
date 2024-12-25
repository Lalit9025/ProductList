import React, { ButtonHTMLAttributes } from 'react'
import '../../styles/button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

