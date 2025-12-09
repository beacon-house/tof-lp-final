import React, { useState, useEffect } from 'react'
import { useFormStore } from '../../store/formStore'
import { InitialLeadCaptureForm } from './InitialLeadCaptureForm'
import { EvaluationAnimation } from './EvaluationAnimation'
import { QualifiedLeadForm } from './QualifiedLeadForm'
import { DisqualifiedLeadForm } from './DisqualifiedLeadForm'
import { saveFormDataIncremental } from '../../lib/formTracking'
import { trackPage2View } from '../../lib/metaEvents'
import { buildWebhookPayload, sendWebhookData } from '../../lib/webhook'

export type FormStep = 'page1' | 'evaluation' | 'page2a' | 'page2b' | 'success'

interface FormContainerProps {
  onClose?: () => void
}

export const FormContainer: React.FC<FormContainerProps> = ({ onClose }) => {
  const formState = useFormStore()
  const [currentStep, setCurrentStep] = useState<FormStep>('page1')

  useEffect(() => {
    if (!formState.sessionId) {
      formState.initializeSession()
    }

    if (formState.sessionId) {
      saveFormDataIncremental(
        formState.sessionId,
        { utmParams: formState.utmParams },
        '01_form_start'
      )
    }
  }, [formState.sessionId])

  const handlePage1Complete = async () => {
    const freshState = useFormStore.getState()
    const { leadCategory, currentGrade, formFillerType, sessionId } = freshState

    if (currentGrade === '7_below') {
      formState.updateField('funnelStage', '10_form_submit')
      await saveFormDataIncremental(
        sessionId,
        {
          pageCompleted: 1,
          funnelStage: '10_form_submit',
          isQualifiedLead: false,
          leadCategory: 'drop'
        },
        '10_form_submit'
      )

      try {
        const webhookUrl = import.meta.env.VITE_WEBHOOK_URL
        if (webhookUrl) {
          const webhookPayload = buildWebhookPayload(useFormStore.getState())
          await sendWebhookData(webhookUrl, webhookPayload)
        }
      } catch (webhookError) {
        console.error('[webhook] Webhook failed but continuing:', webhookError)
      }

      setCurrentStep('success')
      return
    }

    if (formFillerType === 'student') {
      formState.updateField('funnelStage', '10_form_submit')
      await saveFormDataIncremental(
        sessionId,
        {
          pageCompleted: 1,
          funnelStage: '10_form_submit',
          isQualifiedLead: false,
          leadCategory: 'nurture'
        },
        '10_form_submit'
      )

      try {
        const webhookUrl = import.meta.env.VITE_WEBHOOK_URL
        if (webhookUrl) {
          const webhookPayload = buildWebhookPayload(useFormStore.getState())
          await sendWebhookData(webhookUrl, webhookPayload)
        }
      } catch (webhookError) {
        console.error('[webhook] Webhook failed but continuing:', webhookError)
      }

      setCurrentStep('success')
      return
    }

    if (leadCategory === 'bch' || leadCategory === 'lum-l1' || leadCategory === 'lum-l2') {
      setCurrentStep('evaluation')
    } else if (leadCategory === 'nurture' || leadCategory === 'masters') {
      console.log('🎯 Tracking Page 2 View Events (nurture/masters)...')
      const page2ViewEvents = trackPage2View(
        freshState.leadCategory || undefined,
        freshState.isQualifiedLead,
        freshState.formFillerType as 'parent' | 'student'
      )
      formState.addTriggeredEvents(page2ViewEvents)

      formState.updateField('pageCompleted', 2)
      formState.updateField('funnelStage', '07_page_2_view')
      await saveFormDataIncremental(
        sessionId,
        {
          pageCompleted: 2,
          funnelStage: '07_page_2_view',
          isQualifiedLead: freshState.isQualifiedLead,
          leadCategory: freshState.leadCategory,
          triggeredEvents: formState.triggeredEvents
        },
        '07_page_2_view'
      )
      setCurrentStep('page2b')
    }
  }

  const handleEvaluationComplete = async () => {
    console.log('🎯 Tracking Page 2 View Events (qualified leads)...')
    const page2ViewEvents = trackPage2View(
      formState.leadCategory || undefined,
      formState.isQualifiedLead,
      formState.formFillerType as 'parent' | 'student'
    )
    formState.addTriggeredEvents(page2ViewEvents)

    formState.updateField('pageCompleted', 2)
    formState.updateField('funnelStage', '07_page_2_view')
    await saveFormDataIncremental(
      formState.sessionId,
      {
        pageCompleted: 2,
        funnelStage: '07_page_2_view',
        isQualifiedLead: formState.isQualifiedLead,
        leadCategory: formState.leadCategory,
        triggeredEvents: formState.triggeredEvents
      },
      '07_page_2_view'
    )
    setCurrentStep('page2a')
  }

  const handlePage2Complete = () => {
    setCurrentStep('success')
  }

  useEffect(() => {
    if (currentStep === 'page2a' || currentStep === 'page2b' || currentStep === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const getSuccessMessage = () => {
    const { leadCategory, currentGrade, formFillerType, selectedDate, selectedSlot } = formState

    if (currentGrade === '7_below') {
      return "Thank you for your interest. We'll reach out with guidance on preparing for university applications when the time is right."
    }

    if (formFillerType === 'student') {
      return "Thank you for your interest. Our team will review your profile and provide personalized guidance."
    }

    if (leadCategory === 'bch' || leadCategory === 'lum-l1' || leadCategory === 'lum-l2') {
      return `We've scheduled your counselling session for ${selectedDate} at ${selectedSlot}. Our team will contact you soon to confirm.`
    }

    if (leadCategory === 'masters') {
      return "Our Masters specialists will contact you within 48 hours to discuss your specific goals and create a customized application strategy."
    }

    return "Our admissions counsellors shall get back to you to discuss your specific needs and create a personalized roadmap for your university applications."
  }

  return (
    <div className="w-full">
      {currentStep === 'page1' && (
        <div className="animate-fadeIn">
          <InitialLeadCaptureForm onComplete={handlePage1Complete} />
        </div>
      )}

      {currentStep === 'evaluation' && (
        <div className="animate-fadeIn">
          <EvaluationAnimation onComplete={handleEvaluationComplete} />
        </div>
      )}

      {currentStep === 'page2a' && (
        <div className="animate-fadeIn">
          <QualifiedLeadForm onComplete={handlePage2Complete} />
        </div>
      )}

      {currentStep === 'page2b' && (
        <div className="animate-fadeIn">
          <DisqualifiedLeadForm onComplete={handlePage2Complete} />
        </div>
      )}

      {currentStep === 'success' && (
        <div className="animate-fadeIn w-full min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-navy">Thank You!</h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-xl mx-auto">
              {getSuccessMessage()}
            </p>
            {onClose && (
              <button
                onClick={onClose}
                className="mt-8 text-gold hover:text-navy transition-colors font-medium"
              >
                Return to page
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
