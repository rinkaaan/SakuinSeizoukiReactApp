import { Wizard } from '@cloudscape-design/components'
import Engine from './stepComponents/step1'
import Details from './stepComponents/step2'
import Advanced from './stepComponents/step3'
import Review from './stepComponents/step4'
import { useCallback, useState } from 'react'
import { DEFAULT_STEP_INFO } from './steps-config.jsx'

const steps = [
  {
    title: 'Select engine type',
    stateKey: 'engine',
    StepContent: Engine,
  },
  {
    title: 'Specify instance details',
    stateKey: 'details',
    StepContent: Details,
  },
  {
    title: 'Configure settings',
    stateKey: 'advanced',
    StepContent: Advanced,
  },
  {
    title: 'Review and create',
    stateKey: 'review',
    StepContent: Review,
  },
]

const i18nStrings = {
  submitButton: 'Create DB instance',
  stepNumberLabel: stepNumber => `Step ${stepNumber}`,
  collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
  cancelButton: 'Cancel',
  previousButton: 'Previous',
  nextButton: 'Next',
}

const useWizard = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [stepsInfo, setStepsInfo] = useState(DEFAULT_STEP_INFO)

  const onStepInfoChange = useCallback(
    (stateKey, newStepState) => {
      setStepsInfo({
        ...stepsInfo,
        [stateKey]: {
          ...stepsInfo[stateKey],
          ...newStepState,
        },
      })
    },
    [stepsInfo],
  )

  const setActiveStepIndexAndCloseTools = index => {
    setActiveStepIndex(index)
  }

  const onNavigate = evt => {
    setActiveStepIndexAndCloseTools(evt.detail.requestedStepIndex)
  }

  const onCancel = () => {
    console.log('Cancel')
  }

  const onSubmit = () => {
    console.log(stepsInfo)
  }

  return {
    activeStepIndex,
    stepsInfo,
    setActiveStepIndexAndCloseTools,
    onStepInfoChange,
    onNavigate,
    onCancel,
    onSubmit,
  }
}

export function Component() {
  const {
    activeStepIndex,
    stepsInfo,
    setActiveStepIndexAndCloseTools,
    onStepInfoChange,
    onNavigate,
    onCancel,
    onSubmit,
  } = useWizard()

  const wizardSteps = steps.map(({ title, stateKey, StepContent }) => ({
    title,
    content: (
      <StepContent
        info={stepsInfo}
        onChange={newStepState => onStepInfoChange(stateKey, newStepState)}
        setActiveStepIndex={setActiveStepIndexAndCloseTools}
      />
    ),
  }))

  return (
    <Wizard
      steps={wizardSteps}
      activeStepIndex={activeStepIndex}
      i18nStrings={i18nStrings}
      onNavigate={onNavigate}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  )
}
