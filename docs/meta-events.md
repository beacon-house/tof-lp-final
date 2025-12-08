# Custom Meta Pixel Events

## Event Categories

### Primary Lead Classification Events (8 events)

| Event Name | Trigger | Conditions |
| :---- | :---- | :---- |
| `mof_v1_prnt_event_{env}` | Page 1 completion | Parent filled form AND not spam |
| `mof_v1_qualfd_prnt_{env}` | Page 1 completion | Parent filled \+ qualified (BCH/LUM-L1/LUM-L2) \+ not spam |
| `mof_v1_disqualfd_prnt_{env}` | Page 1 completion | Parent filled \+ not qualified \+ not spam |
| `mof_v1_spam_prnt_{env}` | Page 1 completion | Parent filled \+ spam detected (GPA=10 OR percentage=100) |
| `mof_v1_spam_stdnt_{env}` | Page 1 completion | Student filled \+ spam detected |
| `mof_v1_stdnt_{env}` | Page 1 completion | Student filled form |
| `mof_v1_qualfd_stdnt_{env}` | Page 1 completion | Student filled \+ would qualify as parent |
| `mof_v1_disqualfd_stdnt_{env}` | Page 1 completion | Student filled \+ would not qualify as parent OR spam |

### General Funnel Events (12 events)

| Event Name | Trigger | Description |
| :---- | :---- | :---- |
| `tof_v1_page_view_{env}` | Component mount/step change | Page view tracking |
| `tof_v1_cta_hero_{env}` | Hero CTA button click | Landing page hero section CTA |
| `tof_v1_cta_understand_our_approach_{env}` | Bridge Section CTA button click | "Understand Our Approach" button click |
| `mof_v1_page_view_{env}` | MOF sections become visible | Fires after clicking "Understand Our Approach" |
| `mof_v1_cta_click_{env}` | TrustSection CTA clicks | Fires when user clicks either "Book a Founder Strategy Call" or "Request an Evaluation" button (includes ctaType parameter: 'book_call' or 'request_evaluation') |
| `mof_v1_sticky_cta_click_{env}` | Mobile sticky CTA click | Fires when user clicks mobile sticky CTA at bottom (mobile only) |
| `mof_v1_call_scheduled_{env}` | Date and time slot selected | Fires when qualified lead selects both date AND time slot on Page 2A (when isCounsellingBooked becomes true) |
| `mof_v1_page_1_continue_{env}` | Page 1 submission | User clicks continue on Page 1 |
| `mof_v1_page_2_view_{env}` | Page 2 load | User reaches Page 2 |
| `mof_v1_page_2_submit_{env}` | Page 2 submission | User submits Page 2 |
| `mof_v1_form_complete_{env}` | Form completion | Entire form process completed |

### BCH Lead Specific Events (4 events)

| Event Name | Trigger | Conditions |
| :---- | :---- | :---- |
| `mof_v1_bch_page_1_continue_{env}` | Page 1 completion | Lead category \= "bch" |
| `mof_v1_bch_page_2_view_{env}` | Page 2 view | Lead category \= "bch" |
| `mof_v1_bch_page_2_submit_{env}` | Page 2 submission | Lead category \= "bch" |
| `mof_v1_bch_form_complete_{env}` | Form completion | Lead category \= "bch" |

### Luminaire L1 Lead Specific Events (4 events)

| Event Name | Trigger | Conditions |
| :---- | :---- | :---- |
| `mof_v1_lum_l1_page_1_continue_{env}` | Page 1 completion | Lead category \= "lum-l1" |
| `mof_v1_lum_l1_page_2_view_{env}` | Page 2 view | Lead category \= "lum-l1" |
| `mof_v1_lum_l1_page_2_submit_{env}` | Page 2 submission | Lead category \= "lum-l1" |
| `mof_v1_lum_l1_form_complete_{env}` | Form completion | Lead category \= "lum-l1" |

### Luminaire L2 Lead Specific Events (4 events)

| Event Name | Trigger | Conditions |
| :---- | :---- | :---- |
| `mof_v1_lum_l2_page_1_continue_{env}` | Page 1 completion | Lead category \= "lum-l2" |
| `mof_v1_lum_l2_page_2_view_{env}` | Page 2 view | Lead category \= "lum-l2" |
| `mof_v1_lum_l2_page_2_submit_{env}` | Page 2 submission | Lead category \= "lum-l2" |
| `mof_v1_lum_l2_form_complete_{env}` | Form completion | Lead category \= "lum-l2" |

### Qualified Parent Specific Events (4 events)

| Event Name | Trigger | Conditions |
| :---- | :---- | :---- |
| `mof_v1_qualfd_prnt_page_1_continue_{env}` | Page 1 completion | Parent filled \+ qualified lead |
| `mof_v1_qualfd_prnt_page_2_view_{env}` | Page 2 view | Parent filled \+ qualified lead |
| `mof_v1_qualfd_prnt_page_2_submit_{env}` | Page 2 submission | Parent filled \+ qualified lead |
| `mof_v1_qualfd_prnt_form_complete_{env}` | Form completion | Parent filled \+ qualified lead |

### Qualified Student Specific Events (4 events)

| Event Name | Trigger | Conditions |
| :---- | :---- | :---- |
| `mof_v1_qualfd_stdnt_page_1_continue_{env}` | Page 1 completion | Student filled \+ would qualify as parent |
| `mof_v1_qualfd_stdnt_page_2_view_{env}` | Page 2 view | Student filled \+ would qualify as parent |
| `mof_v1_qualfd_stdnt_page_2_submit_{env}` | Page 2 submission | Student filled \+ would qualify as parent |
| `mof_v1_qualfd_stdnt_form_complete_{env}` | Form completion | Student filled \+ would qualify as parent |

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

## New Events Summary

### Recently Implemented Events (4 new events)

1. **`mof_v1_page_view_{env}`**
   - **Trigger**: Fires when MOF sections (Achievements, WhoWeAre, Results, Process, Trust) become visible after user clicks "Understand Our Approach" button
   - **Location**: App.tsx - handleUnderstandApproach function

2. **`mof_v1_cta_click_{env}`**
   - **Trigger**: Fires when user clicks either button in TrustSection
     - "Book a Founder Strategy Call" (ctaType: 'book_call')
     - "Request an Evaluation" (ctaType: 'request_evaluation')
   - **Parameters**: `{ ctaType: 'book_call' | 'request_evaluation' }`
   - **Location**: TrustSection.tsx - handleBookCall and handleRequestEvaluation functions

3. **`mof_v1_sticky_cta_click_{env}`**
   - **Trigger**: Fires when user clicks the mobile sticky CTA button at bottom of screen (mobile only, appears after scrolling)
   - **Button Text**: "Request an Evaluation"
   - **Location**: StickyMobileCTA.tsx - handleClick function

4. **`mof_v1_call_scheduled_{env}`**
   - **Trigger**: Fires when qualified lead selects both date AND time slot on Page 2A (QualifiedLeadForm)
   - **Condition**: When `isCounsellingBooked` becomes `true`
   - **Parameters**: Includes lead metadata (leadCategory, isQualified, formFillerType, selectedDate, selectedSlot)
   - **Location**: QualifiedLeadForm.tsx - handleFieldChange function
