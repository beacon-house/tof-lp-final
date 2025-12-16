# Custom Meta Pixel Events

## Total Event Count

**43 Total Events** across all categories:
- 8 Primary Lead Classification Events
- 15 General Funnel Events
- 4 BCH Lead Specific Events
- 4 Luminaire L1 Lead Specific Events
- 4 Luminaire L2 Lead Specific Events
- 4 Qualified Parent Specific Events
- 4 Qualified Student Specific Events

## Event Categories

### Primary Lead Classification Events (8 events)

| Event Name | Trigger | Conditions | Parameters Sent |
| :---- | :---- | :---- | :---- |
| `mof_v1_prnt_event_{env}` | Page 1 completion | Parent filled form AND not spam | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_qualfd_prnt_{env}` | Page 1 completion | Parent filled \+ qualified (BCH/LUM-L1/LUM-L2) \+ not spam | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_disqualfd_prnt_{env}` | Page 1 completion | Parent filled \+ not qualified \+ not spam | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_spam_prnt_{env}` | Page 1 completion | Parent filled \+ spam detected (GPA=10 OR percentage=100) | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_spam_stdnt_{env}` | Page 1 completion | Student filled \+ spam detected | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_stdnt_{env}` | Page 1 completion | Student filled form | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_qualfd_stdnt_{env}` | Page 1 completion | Student filled \+ would qualify as parent | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_disqualfd_stdnt_{env}` | Page 1 completion | Student filled \+ would not qualify as parent OR spam | formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |

### General Funnel Events (15 events)

| Event Name | Trigger | Description | Parameters Sent |
| :---- | :---- | :---- | :---- |
| `tof_v1_page_view_{env}` | Component mount/step change | Page view tracking | None |
| `tof_v1_cta_hero_{env}` | Hero CTA button click | Landing page hero section CTA | None |
| `tof_v1_cta_understand_our_approach_{env}` | Bridge Section CTA button click | "Understand Our Approach" button click | None |
| `mof_v1_page_view_{env}` | MOF sections become visible | Fires after clicking "Understand Our Approach" | None |
| `mof_v1_cta_click_{env}` | **ANY CTA button click** | **Common event** that fires for ALL CTA clicks (Book Call, Request Evaluation, and Sticky CTA) | None |
| `mof_v1_book_call_{env}` | "Book a Founder Strategy Call" button click | Specific event for Book Call button in TrustSection | None |
| `mof_v1_request_evaluation_{env}` | "Request an Evaluation" button click | Specific event for Request Evaluation button in TrustSection | None |
| `mof_v1_sticky_cta_click_{env}` | Mobile sticky CTA click | Specific event for sticky CTA at bottom (mobile/desktop) | None |
| `mof_v1_call_scheduled_{env}` | Date and time slot selected | Fires when qualified lead selects both date AND time slot on Page 2A (when isCounsellingBooked becomes true) | Optional: formFillerType, currentGrade, scholarshipRequirement, targetGeographies, gpaValue, percentageValue, gradeFormat, leadCategory, isQualified |
| `mof_v1_page_1_continue_{env}` | Page 1 submission | User clicks continue on Page 1 | None |
| `mof_v1_page_2_view_{env}` | Page 2 load | User reaches Page 2 | None |
| `mof_v1_page_2_submit_{env}` | Page 2 submission | User submits Page 2 | None |
| `mof_v1_form_complete_{env}` | Form completion | Entire form process completed | None |

### BCH Lead Specific Events (4 events)

| Event Name | Trigger | Conditions | Parameters Sent |
| :---- | :---- | :---- | :---- |
| `mof_v1_bch_page_1_continue_{env}` | Page 1 completion | Lead category \= "bch" | None |
| `mof_v1_bch_page_2_view_{env}` | Page 2 view | Lead category \= "bch" | None |
| `mof_v1_bch_page_2_submit_{env}` | Page 2 submission | Lead category \= "bch" | None |
| `mof_v1_bch_form_complete_{env}` | Form completion | Lead category \= "bch" | None |

### Luminaire L1 Lead Specific Events (4 events)

| Event Name | Trigger | Conditions | Parameters Sent |
| :---- | :---- | :---- | :---- |
| `mof_v1_lum_l1_page_1_continue_{env}` | Page 1 completion | Lead category \= "lum-l1" | None |
| `mof_v1_lum_l1_page_2_view_{env}` | Page 2 view | Lead category \= "lum-l1" | None |
| `mof_v1_lum_l1_page_2_submit_{env}` | Page 2 submission | Lead category \= "lum-l1" | None |
| `mof_v1_lum_l1_form_complete_{env}` | Form completion | Lead category \= "lum-l1" | None |

### Luminaire L2 Lead Specific Events (4 events)

| Event Name | Trigger | Conditions | Parameters Sent |
| :---- | :---- | :---- | :---- |
| `mof_v1_lum_l2_page_1_continue_{env}` | Page 1 completion | Lead category \= "lum-l2" | None |
| `mof_v1_lum_l2_page_2_view_{env}` | Page 2 view | Lead category \= "lum-l2" | None |
| `mof_v1_lum_l2_page_2_submit_{env}` | Page 2 submission | Lead category \= "lum-l2" | None |
| `mof_v1_lum_l2_form_complete_{env}` | Form completion | Lead category \= "lum-l2" | None |

### Qualified Parent Specific Events (4 events)

| Event Name | Trigger | Conditions | Parameters Sent |
| :---- | :---- | :---- | :---- |
| `mof_v1_qualfd_prnt_page_1_continue_{env}` | Page 1 completion | Parent filled \+ qualified lead | None |
| `mof_v1_qualfd_prnt_page_2_view_{env}` | Page 2 view | Parent filled \+ qualified lead | None |
| `mof_v1_qualfd_prnt_page_2_submit_{env}` | Page 2 submission | Parent filled \+ qualified lead | None |
| `mof_v1_qualfd_prnt_form_complete_{env}` | Form completion | Parent filled \+ qualified lead | None |

### Qualified Student Specific Events (4 events)

| Event Name | Trigger | Conditions | Parameters Sent |
| :---- | :---- | :---- | :---- |
| `mof_v1_qualfd_stdnt_page_1_continue_{env}` | Page 1 completion | Student filled \+ would qualify as parent | None |
| `mof_v1_qualfd_stdnt_page_2_view_{env}` | Page 2 view | Student filled \+ would qualify as parent | None |
| `mof_v1_qualfd_stdnt_page_2_submit_{env}` | Page 2 submission | Student filled \+ would qualify as parent | None |
| `mof_v1_qualfd_stdnt_form_complete_{env}` | Form completion | Student filled \+ would qualify as parent | None |

## Event Firing Sequence

### Page 1 Completion Flow

1. **Primary Classification Events** fire first based on form filler type and spam detection
2. **General Funnel Event**: `mof_v1_page_1_continue_{env}`
3. **Category-Specific Events**: Based on determined lead category
4. **Qualified Parent/Student Events**: If applicable

### Page 2 Flow

1. **Page 2 View**: General \+ category-specific \+ qualified events
2. **Page 2 Submit**: General \+ category-specific \+ qualified events
3. **Form Complete**: General \+ category-specific \+ qualified events

## Qualification Logic

### Spam Detection

- GPA \= "10" OR percentage \= "100"

### Student Qualification Simulation

Students are evaluated as if parent filled the form using same BCH/Luminaire criteria:

- **BCH**: Grades 8-10 \+ optional/partial scholarship OR Grade 11 \+ US target  
- **Luminaire L1**: Grade 11 \+ optional scholarship \+ non-US target OR Grade 12 \+ optional scholarship  
- **Luminaire L2**: Grade 11 \+ partial scholarship \+ non-US target OR Grade 12 \+ partial scholarship

### Qualified Lead Categories

- **BCH**: `bch`  
- **Luminaire L1**: `lum-l1`  
- **Luminaire L2**: `lum-l2`

## Environment Suffix

All events automatically include environment suffix:

- Prod: `prod`
- Staging: `stg`

Environment value comes from `VITE_ENVIRONMENT` variable.

## Event Parameters

### Parameter Definitions

| Parameter | Type | Description | Possible Values |
| :---- | :---- | :---- | :---- |
| `formFillerType` | string | Who is filling the form | `parent`, `student` |
| `currentGrade` | string | Student's current grade level | `7_below`, `8`, `9`, `10`, `11`, `12`, `masters` |
| `scholarshipRequirement` | string | Scholarship requirement | `scholarship_optional`, `partial_scholarship`, `full_scholarship` |
| `targetGeographies` | array | Target countries for admission | `US`, `UK`, `Rest of World`, `Need Guidance` |
| `gpaValue` | string | GPA score (if grade format is GPA) | e.g., `3.5`, `4.0`, `10` |
| `percentageValue` | string | Percentage score (if grade format is percentage) | e.g., `85`, `90`, `100` |
| `gradeFormat` | string | Format of academic grade | `gpa`, `percentage` |
| `leadCategory` | string | Categorized lead type | `bch`, `lum-l1`, `lum-l2`, `nurture` |
| `isQualified` | boolean | Whether lead is qualified | `true`, `false` |
| `isSpam` | boolean | Whether lead is spam | `true`, `false` |

## Event Storage

- Events are tracked in form state via `triggeredEvents` array
- Events are included in webhook payload for database storage
- Events are sent to both Meta Pixel and Google Analytics

## Proposed Event Architecture Mapping

### Event Mapping Table

| Proposed Event | Implemented Event | Status |
| :---- | :---- | :---- |
| `bh_tof_approach_click` | `tof_v1_cta_understand_our_approach_{env}` | ✅ Implemented |
| `bh_mof_page_view` | `mof_v1_page_view_{env}` | ✅ Implemented |
| `bh_mof_cta_click` | `mof_v1_cta_click_{env}` | ✅ Implemented |
| `bh_questionnaire_load` | `mof_v1_page_2_view_{env}` | ✅ Implemented |
| `bh_questionnaire_submit` | `mof_v1_form_complete_{env}` | ✅ Implemented |
| `bh_qualified_lead` | `mof_v1_qualfd_prnt_{env}` / `mof_v1_qualfd_stdnt_{env}` | ✅ Implemented |
| `bh_call_scheduled` | `mof_v1_call_scheduled_{env}` | ✅ Implemented |

## CTA Event Tracking Architecture

### Dual-Layer Event System

When ANY CTA button is clicked, **TWO events fire**:
1. **Common Event**: `mof_v1_cta_click_{env}` (tracks ALL CTA interactions)
2. **Specific Event**: Button-specific event (tracks which button was clicked)

### CTA Event Combinations

#### "Book a Founder Strategy Call" Button (TrustSection)
Fires 2 events:
- `mof_v1_cta_click_{env}` (common)
- `mof_v1_book_call_{env}` (specific)

#### "Request an Evaluation" Button (TrustSection)
Fires 2 events:
- `mof_v1_cta_click_{env}` (common)
- `mof_v1_request_evaluation_{env}` (specific)

#### Sticky CTA Button (Mobile/Desktop - Bottom)
Fires 2 events:
- `mof_v1_cta_click_{env}` (common)
- `mof_v1_sticky_cta_click_{env}` (specific)

### Implementation Details

**Location**: `src/lib/metaEvents.ts`

```typescript
// Fires 2 events for TrustSection buttons
export function trackMofCtaClick(ctaType: 'book_call' | 'request_evaluation'): string[] {
  const events: string[] = []
  events.push(trackMetaEvent('mof_v1_cta_click')) // Common
  if (ctaType === 'book_call') {
    events.push(trackMetaEvent('mof_v1_book_call')) // Specific
  } else if (ctaType === 'request_evaluation') {
    events.push(trackMetaEvent('mof_v1_request_evaluation')) // Specific
  }
  return events
}

// Fires 2 events for Sticky CTA
export function trackMofStickyCtaClick(): string[] {
  const events: string[] = []
  events.push(trackMetaEvent('mof_v1_cta_click')) // Common
  events.push(trackMetaEvent('mof_v1_sticky_cta_click')) // Specific
  return events
}
```

### Benefits of Dual-Layer System

1. **Aggregate Tracking**: `mof_v1_cta_click_{env}` provides total CTA engagement across all buttons
2. **Granular Analysis**: Specific events show which CTAs perform best
3. **Flexible Reporting**: Can analyze both individual and combined performance
