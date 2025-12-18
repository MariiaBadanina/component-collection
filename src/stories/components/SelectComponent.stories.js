import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/Button/'
import SelectComponent from '../../components/SelectComponent'
import ConfirmationMessage from '../../components/ConfirmationMessage'
import countriesList from '../../constants/countriesList'

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
  const [countryValue, setCountryValue] = useState(null)
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
            <SelectComponent
              register={register}
              error={errors}
              name="country"
              required={true}
              defaultOptionLabel="Country *"
              errorMessage="Select country"
              options={countriesList}
              value={countryValue}
              setValue={setCountryValue}
              label="ISO"
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
  title: 'Components/SelectComponent',
  parameters: {
    docs: {
      description: {
        component:
          'Custom select component built for controlled form environments. Designed to handle predefined option sets and validation states within CMS forms. Used as a base primitive in complex form flows.',
      },
    },
    options: {
      showPanel: false,
    },
  },
}
