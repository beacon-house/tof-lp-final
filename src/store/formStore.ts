import { create } from 'zustand'
import { LeadCategory } from '../lib/leadCategorization'
import { UtmParams, extractUtmParams } from '../lib/utm'
import { FunnelStage } from '../lib/formTracking'

export interface FormState {
  sessionId: string
  formFillerType: 'parent' | 'student' | ''
  studentName: string
  currentGrade: string
  location: string
  phoneNumber: string
  countryCode: string
  curriculumType: string
  schoolName: string
  gradeFormat: 'gpa' | 'percentage'
  gpaValue: string
  percentageValue: string
  scholarshipRequirement: 'full_scholarship' | 'partial_scholarship' | 'scholarship_optional' | ''
  targetGeographies: string[]
  parentName: string
  email: string
  selectedDate: string
  selectedSlot: string
  leadCategory: LeadCategory | null
  isQualifiedLead: boolean
  isCounsellingBooked: boolean
  funnelStage: FunnelStage
  pageCompleted: number
  triggeredEvents: string[]
  utmParams: UtmParams
  eventCounter: number
}

interface FormStore extends FormState {
  initializeSession: () => void
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void
  updateMultipleFields: (updates: Partial<FormState>) => void
  addTriggeredEvents: (events: string[]) => void
  incrementEventCounter: () => number
  resetForm: () => void
}

const initialState: FormState = {
  sessionId: '',
  formFillerType: '',
  studentName: '',
  currentGrade: '',
  location: '',
  phoneNumber: '',
  countryCode: '+91',
  curriculumType: '',
  schoolName: '',
  gradeFormat: 'gpa',
  gpaValue: '',
  percentageValue: '',
  scholarshipRequirement: '',
  targetGeographies: [],
  parentName: '',
  email: '',
  selectedDate: '',
  selectedSlot: '',
  leadCategory: null,
  isQualifiedLead: false,
  isCounsellingBooked: false,
  funnelStage: '01_form_start',
  pageCompleted: 1,
  triggeredEvents: [],
  utmParams: {},
  eventCounter: 0,
}

export const useFormStore = create<FormStore>((set, get) => ({
  ...initialState,
  initializeSession: () => {
    const sessionId = crypto.randomUUID()
    const utmParams = extractUtmParams()
    set({ sessionId, utmParams, funnelStage: '01_form_start', triggeredEvents: [], eventCounter: 0 })
  },
  updateField: (field, value) => set({ [field]: value }),
  updateMultipleFields: (updates) => set(updates),
  addTriggeredEvents: (events) => {
    const currentEvents = get().triggeredEvents
    const newEvents = [...currentEvents, ...events]
    set({ triggeredEvents: newEvents })
  },
  incrementEventCounter: () => {
    const current = get().eventCounter
    const next = current + 1
    set({ eventCounter: next })
    return next
  },
  resetForm: () => set(initialState),
}))
