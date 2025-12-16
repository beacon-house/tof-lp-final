import { supabase } from './supabase'
import { FormState } from '../store/formStore'
import { shouldLog } from './logger'

export type FunnelStage =
  | '01_form_start'
  | '02_page1_student_info_filled'
  | '03_page1_academic_info_filled'
  | '04_page1_scholarship_info_filled'
  | '05_page1_complete'
  | '06_lead_evaluated'
  | '07_page_2_view'
  | '08_page_2_counselling_slot_selected'
  | '09_page_2_parent_details_filled'
  | '10_form_submit'

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

export async function saveFormDataIncremental(
  sessionId: string,
  formData: Partial<FormState>,
  funnelStage: FunnelStage
): Promise<boolean> {
  try {
    if (shouldLog()) {
      console.log('[formTracking] saveFormDataIncremental called')
      console.log('[formTracking] sessionId:', sessionId)
      console.log('[formTracking] funnelStage:', funnelStage)
      console.log('[formTracking] formData:', formData)
    }

    const dbData: Record<string, any> = {
      environment: import.meta.env.VITE_ENVIRONMENT,
      funnel_stage: funnelStage,
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value === '' && typeof value === 'string') {
          return
        }

        if (key === 'countryCode' || key === 'phoneNumber') {
          return
        }

        if (key === 'email') {
          dbData['parent_email'] = value
        } else {
          const snakeKey = camelToSnake(key)
          dbData[snakeKey] = value
        }
      }
    })

    if (formData.countryCode && formData.phoneNumber) {
      dbData.phone_number = `${formData.countryCode}${formData.phoneNumber}`
    }

    if (formData.triggeredEvents) {
      const events = Array.isArray(formData.triggeredEvents)
        ? formData.triggeredEvents
        : []
      if (!events.includes(funnelStage)) {
        dbData.triggered_events = [...events, funnelStage]
      } else {
        dbData.triggered_events = events
      }
    } else {
      dbData.triggered_events = [funnelStage]
    }

    if (shouldLog()) {
      console.log('[formTracking] Final dbData to save:', dbData)
      console.log('[formTracking] isQualifiedLead value:', dbData.is_qualified_lead)
    }

    const { error } = await supabase.rpc('upsert_form_session', {
      p_session_id: sessionId,
      p_form_data: dbData
    })

    if (shouldLog()) {
      console.log('[formTracking] RPC call result - error:', error)
    }

    if (error) {
      if (shouldLog()) {
        console.error('RPC upsert failed, trying direct upsert:', error)
      }

      const { error: directError } = await supabase
        .from('form_sessions')
        .upsert([{ session_id: sessionId, ...dbData }], {
          onConflict: 'session_id'
        })

      if (directError) {
        if (shouldLog()) {
          console.error('Direct upsert failed:', directError)
        }
        return false
      }
    }

    return true
  } catch (error) {
    if (shouldLog()) {
      console.error('Error saving form data:', error)
    }
    return false
  }
}
