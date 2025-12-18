import * as React from 'react'
import Button from '../../components/Button/index'
import { useWindowResize } from '../../hooks/useWindowResize'

export const Base = () => {
  const windowWidth = useWindowResize()

  return (
    <div
      style={{
        background: 'var(--ui02)',
        padding: 'var(--spc-m) var(--spc-xxl)',
        display: 'flex',
        flexDirection: windowWidth < 1024 ? 'column' : 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          margin: 'var(--spc-xs)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          appearance="primary01"
          buttonText="Primary 01"
          marginBottom="var(--spc-xxxs)"
        />
        <Button
          appearance="primary01"
          buttonText="Primary 01 disabled"
          disabled
        />
      </div>
      <div
        style={{
          margin: 'var(--spc-xs)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          appearance="primary02"
          buttonText="Primary 02"
          marginBottom="var(--spc-xxxs)"
        />
        <Button
          appearance="primary02"
          buttonText="Primary 02 disabled"
          disabled
        />
      </div>
      <div
        style={{
          margin: 'var(--spc-xs)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          appearance="secondary"
          buttonText="Secondary"
          marginBottom="var(--spc-xxxs)"
        />
        <Button
          appearance="secondary"
          buttonText="Secondary disabled"
          disabled
        />
      </div>
      <div
        style={{
          margin: 'var(--spc-xs)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          appearance="link"
          buttonText="Link"
          marginBottom="var(--spc-xs)"
        />
        <Button appearance="link" buttonText="Link disabled" disabled />
      </div>
    </div>
  )
}

export default {
  title: 'Elements/Buttons',
  parameters: {
    docs: {
      description: {
        component:
          'Reusable button component designed for a CMS design system. Supports multiple visual variants and disabled states. Styling is handled via CSS Modules and CSS custom properties to enable theming without runtime style generation. Intended to be used as a base primitive across composed modules.',
      },
    },
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
}
