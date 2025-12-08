import { z } from 'zod'

export const page1Schema = z.object({
  formFillerType: z.enum(['parent', 'student'], 'Please select who is filling this form'),
  studentName: z.string().min(2, 'Please enter student\'s name'),
  currentGrade: z.string().min(1, 'Please select a grade'),
  location: z.string().min(2, 'Please enter your city or town'),
  countryCode: z.string().min(1, 'Please add country code'),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, 'Please enter your contact number'),
  curriculumType: z.string().min(1, 'Please select curriculum'),
  schoolName: z.string().min(2, 'Please enter school name'),
  gradeFormat: z.enum(['gpa', 'percentage']),
  gpaValue: z.string().optional(),
  percentageValue: z.string().optional(),
  scholarshipRequirement: z.enum(['full_scholarship', 'partial_scholarship', 'scholarship_optional'], 'Please select scholarship requirement'),
  targetGeographies: z.array(z.string()).min(1, 'Please select at least one region'),
}).refine((data) => {
  if (data.gradeFormat === 'gpa') {
    return data.gpaValue && data.gpaValue.length > 0
  }
  return true
}, {
  message: 'Please enter your GPA',
  path: ['gpaValue']
}).refine((data) => {
  if (data.gradeFormat === 'percentage') {
    return data.percentageValue && data.percentageValue.length > 0
  }
  return true
}, {
  message: 'Please enter your percentage',
  path: ['percentageValue']
}).refine((data) => {
  if (data.gradeFormat === 'gpa' && data.gpaValue) {
    const gpa = parseFloat(data.gpaValue)
    return !isNaN(gpa) && gpa >= 1.0 && gpa <= 10.0
  }
  return true
}, {
  message: 'GPA should be between 1.0 and 10.0',
  path: ['gpaValue']
}).refine((data) => {
  if (data.gradeFormat === 'percentage' && data.percentageValue) {
    const percentage = parseFloat(data.percentageValue)
    return !isNaN(percentage) && percentage >= 1 && percentage <= 100
  }
  return true
}, {
  message: 'Percentage should be between 1 and 100',
  path: ['percentageValue']
})

export const page2ASchema = z.object({
  parentName: z.string().min(2, 'Please enter parent\'s name'),
  email: z.string().email('Please enter a valid email'),
  selectedDate: z.string().min(1, 'Please select a date'),
  selectedSlot: z.string().min(1, 'Please select a time'),
})

export const page2BSchema = z.object({
  parentName: z.string().min(2, 'Please enter parent\'s name'),
  email: z.string().email('Please enter a valid email'),
})

export type Page1FormData = z.infer<typeof page1Schema>
export type Page2AFormData = z.infer<typeof page2ASchema>
export type Page2BFormData = z.infer<typeof page2BSchema>
