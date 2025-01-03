import React from 'react'
import { InputField } from './global/inputfield/InputField'

export default function ForgotPassword() {
  return (
    
    <InputField 
    label="Email Address"
    type="email"
    placeholder="Enter your email address"
    required={true}
    
    
    />
  )
}
