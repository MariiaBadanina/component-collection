import React from 'react'
import ApplyForm from '../../modules/ApplyForm'

const defaultProps = {
  title: 'Title',
  subtitle: 'Subtitle',
  detail:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor nisi, rutrum amet tortor sed elementum. Commodo, proin tincidunt facilisi pellentesque morbi',
  stepOneButton: 'Go to second step',
  stepTwoButton: 'Submint',
}

export const Base = () => <ApplyForm {...defaultProps} />

export default {
  title: 'Modules/TwoStepForm',
  parameters: {
    docs: {
      description: {
        component:
          'Multi-step form module built to demonstrate complex user flows in a CMS context. Implements validation, step transitions, and controlled inputs using react-hook-form. Represents a real-world product use case rather than an abstract UI example.',
      },
    },
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
}
