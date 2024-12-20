"use client";
import React from 'react'
import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';


const SignUpForm = () => {
  const {control, handleSubmit, formState:{errors}} = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post('/api/auth/register',data)

    if(res.status === 201){
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      }
    )
    if(result.ok){
      router.push('/dashboard')
    }
    if(!result.ok){
      console.log(result.error)
    }
    }
    console.log(res);
  })
  return (
    <form onSubmit={onSubmit}>
    <Flex direction="column" gap="2">
        <label htmlFor="name">Name:</label>
      <TextField.Root>
        <TextField.Slot>
            <PersonIcon height="16" width="16" />
        </TextField.Slot>
        <Controller 
        name = "name"
        control= {control}
        rules = {{
          required: {
            value: true,
            message: 'Name is required'
          }
        }}
        render = {({field}) => {
          return (
            <TextField.Input id="name" type="name" placeholder="Write your name" {...field} />
          )
        }}
        />
      </TextField.Root>
      {errors.name && typeof errors.name.message === 'string' && (<Text color="red" size="2">{errors.name.message}</Text>)}

      <label htmlFor="email">E-mail</label>
      <TextField.Root>
        <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
        </TextField.Slot>
        <Controller 
          name = "email"
          control= {control}
          rules = {{
            required: {
              value: true,
              message: 'E-mail is required'
            }
          }}
          render = {({field}) => {
            return (
              <TextField.Input id="email" type="email" placeholder="e-mail" {...field} />
            )
          }}
        />
      </TextField.Root>
      {errors.email && typeof errors.email.message === 'string' && (<Text color="red" size="2">{errors.email.message}</Text>)}

      <label htmlFor="password">Password</label>
      <TextField.Root>
        <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
        <Controller 
          name = "password"
          control= {control}
          rules = {{required: {
            value: true,
            message: 'Password is required'
          },
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
        }
        }}
          render = {({field}) => {
            return (
              <TextField.Input id="password" type="password" placeholder="********" {...field} />
            )
          }}
        />
      </TextField.Root>
      {errors.password && typeof errors.password.message === 'string' && (<Text color="red" size="2">{errors.password.message}</Text>)}

      <Button type='submit' mt="4" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-all">
        Sign Up
      </Button>
    </Flex>

    </form>
  )
}
export default SignUpForm
