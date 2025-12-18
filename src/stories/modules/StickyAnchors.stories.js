import React, { useRef } from 'react'
import StickyAnchors from '../../modules/StickyAnchors'
import MaxWidth from '../../components/MaxWidth'

const studyMenuOptions = Array(8)
  .fill(0)
  .map((x, idx) => ({
    label: `Title ${idx + 1}`,
  }))
const sections = Array(8)
  .fill(0)
  .map((x, idx) => ({
    label: `Section ${idx + 1}`,
  }))

export const Base = () => {
  const itemEls = useRef(new Array())
  return (
    <div style={{ minHeight: '200vh' }}>
      <div
        style={{
          height: '100px',
          background: 'var(--bg03)',
        }}
      />
      <div
        style={{
          height: '50vh',
          background: 'var(--bg04)',
        }}
      />
      <StickyAnchors
        studyMenuOptions={studyMenuOptions}
        itemEls={itemEls}
        title="Title"
      >
        <MaxWidth>
          {sections?.map((item, index) => (
            <div
              key={index}
              ref={(element) => (itemEls.current[index] = element)}
              id={index}
              style={{
                marginBottom: 'var(--spc-xs)',
                padding: 'var(--spc-l)',
                height: '400px',
                background: 'var(--bg03)',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--textInverse)',
              }}
              className="body-lead-xl"
            >
              {item.label}
            </div>
          ))}
        </MaxWidth>
      </StickyAnchors>
      <div style={{ height: '100vh', background: 'var(--ui02)' }} />
    </div>
  )
}

export default {
  title: 'Modules/StickyAnchors',
  parameters: {
    docs: {
      description: {
        component:
          'Navigation module that highlights the active section while scrolling. Designed for long-form CMS pages to improve orientation and content discoverability. Demonstrates scroll-based state management and layout coordination.',
      },
    },
    options: {
      showPanel: false,
    },
  },
}
