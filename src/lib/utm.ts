export interface UtmParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  utm_id?: string
  campaign_id?: string
  utm_adset?: string
  adset_id?: string
  ad_id?: string
  utm_placement?: string
}

export function extractUtmParams(): UtmParams {
  const urlParams = new URLSearchParams(window.location.search)

  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
    utm_id: urlParams.get('utm_id') || undefined,
    campaign_id: urlParams.get('campaign_id') || undefined,
    utm_adset: urlParams.get('utm_adset') || undefined,
    adset_id: urlParams.get('adset_id') || undefined,
    ad_id: urlParams.get('ad_id') || undefined,
    utm_placement: urlParams.get('utm_placement') || undefined,
  }
}
