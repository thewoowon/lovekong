import React from 'react'

interface IFormErrorProps {
  errorMessage?: string
}

export function FormError({ errorMessage }: IFormErrorProps) {
  return (
    <span role={'alert'} className="mx-4 text-xs text-red-400">
      {errorMessage}
    </span>
  )
}
