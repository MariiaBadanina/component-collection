import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/Button/'
import InputComponent from '../../components/InputComponent'
import ConfirmationMessage from '../../components/ConfirmationMessage'

export const Base = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  })
  const [sent, setSent] = useState(false)
  const onSubmit = (data) => {
    setSent(true)
    alert(JSON.stringify(data))
  }

  return (
    <div
      style={{
        height: '100vh',
        background: 'var(--ui02)',
        padding: 'var(--spc-4xl)',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {sent ? (
          <AnimatePresence>
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ConfirmationMessage reset={reset} setSent={setSent} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputComponent
              labelText="Name *"
              name="name"
              type="text"
              register={register}
              error={errors}
              required={{
                required: 'This field is required',
                minlength: 1,
                maxlength: 128,
                pattern: {
                  value: /^([a-zA-ZÀ-ÿẞ])+(([ ]([a-zA-ZÀ-ÿẞ])+)+)?$/,
                  message: 'Introduce a valid name',
                },
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <Button
                appearance="secondary"
                type="submit"
                button={true}
                buttonText="Submit"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default {
  title: 'Components/InputComponent',
  parameters: {
    docs: {
      description: {
        component:
          'Reusable input component designed for form-heavy CMS interfaces. Supports validation states and is intended to be used together with react-hook-form. Serves as a base form primitive across composed modules.',
      },
    },
    options: {
      showPanel: false,
    },
  },
}
