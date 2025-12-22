# Verification Guide: Meta CAPI IP Tracking Fix

This guide helps you verify that the IP address tracking fix is working correctly.

## Development Server

The dev server should be running at: **http://localhost:5173**

---

## Step 1: Check Frontend Console Logs

### Open Browser Console
1. Open your site in the browser (http://localhost:5173)
2. Open Developer Tools (F12 or Cmd+Option+I on Mac)
3. Go to the **Console** tab

### What to Look For

#### ✅ Success Indicators:

**1. IP Fetch Logs:**
```
[ClientInfo] Fetching client IP from: https://YOUR_PROJECT.supabase.co/functions/v1/get-client-ip
[ClientInfo] Client IP cached: xxx.xxx.xxx.xxx
```

**2. Event Logs with IP:**
```
🎯 META EVENT FIRED: {
  eventName: "tof_v1_page_view_stg",
  eventId: "...",
  automaticParams: {
    fbp: "fb.1.xxx",
    fbc: "fb.1.xxx",
    client_user_agent: "PRESENT"
  },
  userData: {
    fbp: "...",
    fbc: "...",
    client_user_agent: "Mozilla/5.0...",
    client_ip_address: "xxx.xxx.xxx.xxx",  // ✅ This should be present
    external_id: "..."
  }
}
```

**3. CAPI Logs:**
```
[CAPI] Calling Edge Function: https://YOUR_PROJECT.supabase.co/functions/v1/meta-capi
[CAPI] Payload: {
  "event_name": "...",
  "user_data": {
    "client_ip_address": "xxx.xxx.xxx.xxx",  // ✅ Should be here
    "client_user_agent": "Mozilla/5.0...",    // ✅ Should be here
    ...
  }
}
[CAPI] Successfully sent event: 200
```

#### ⚠️ Expected Warnings (OK for Early Events):

**Early events (first 1-3) may not have IP yet:**
```
[ClientInfo] Fetching client IP from: ...
🎯 META EVENT FIRED: {
  userData: {
    client_ip_address: undefined  // ⚠️ OK for first few events
  }
}
```

This is **NORMAL** - the IP fetch is async, so early events may fire before IP is cached.

#### ❌ Error Indicators:

**If you see these, something is wrong:**
```
[ClientInfo] Failed to fetch IP: 404
[ClientInfo] Error fetching IP (non-blocking): ...
[CAPI] Failed to send event: 500
```

---

## Step 2: Check Network Requests

### Open Network Tab
1. In Developer Tools, go to **Network** tab
2. Filter by "Fetch/XHR" or search for "functions"

### What to Look For

#### ✅ Success: `get-client-ip` Request

**Request:**
- URL: `https://YOUR_PROJECT.supabase.co/functions/v1/get-client-ip`
- Method: `GET`
- Status: `200 OK`

**Response:**
```json
{
  "ip": "xxx.xxx.xxx.xxx"
}
```

#### ✅ Success: `meta-capi` Request

**Request:**
- URL: `https://YOUR_PROJECT.supabase.co/functions/v1/meta-capi`
- Method: `POST`
- Status: `200 OK`

**Request Payload (check in Request tab):**
```json
{
  "event_name": "tof_v1_page_view_stg",
  "user_data": {
    "client_ip_address": "xxx.xxx.xxx.xxx",  // ✅ Should be here
    "client_user_agent": "Mozilla/5.0...",    // ✅ Should be here
    "fbp": "...",
    "fbc": "...",
    "external_id": "..."
  },
  "event_id": "...",
  "event_time": 1234567890,
  "event_source_url": "http://localhost:5173/..."
}
```

**Response:**
```json
{
  "success": true,
  "event_id": "...",
  "meta_response": {
    "events_received": 1
  }
}
```

---

## Step 3: Check Supabase Edge Function Logs

### Access Supabase Logs
1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Edge Functions** → **Logs**
3. Select the function you want to check

### Check `get-client-ip` Function Logs

**Look for:**
- ✅ Successful requests with status `200`
- ✅ Response containing IP address: `{"ip": "xxx.xxx.xxx.xxx"}`
- ❌ No errors or 500 status codes

**Example log entry:**
```
[INFO] GET /functions/v1/get-client-ip
[INFO] Response: {"ip": "xxx.xxx.xxx.xxx"}
[INFO] Status: 200
```

### Check `meta-capi` Function Logs

**Look for:**
- ✅ Successful requests with status `200`
- ✅ Payload includes `client_ip_address` and `client_user_agent`
- ✅ Meta API response: `{"events_received": 1}`

**Example log entry:**
```
[INFO] POST /functions/v1/meta-capi
[INFO] Payload received: {
  "event_name": "...",
  "user_data": {
    "client_ip_address": "xxx.xxx.xxx.xxx",  // ✅ Should be here
    "client_user_agent": "Mozilla/5.0...",    // ✅ Should be here
    ...
  }
}
[INFO] Meta CAPI response: {"events_received": 1}
[INFO] Status: 200
```

**Check for errors:**
- ❌ "Missing client_ip_address" - Edge Function not extracting from payload
- ❌ "Meta CAPI error" - Issue with Meta API call
- ❌ "Server configuration error" - Missing META_ACCESS_TOKEN or META_PIXEL_ID

---

## Step 4: Verify IP Address Matching

### What We're Fixing

**Before Fix:**
- Pixel events: Real client IP (e.g., `203.0.113.45`)
- CAPI events: Supabase proxy IP (e.g., `54.174.79.57`)
- **Result**: IP mismatch → Meta Events Manager errors

**After Fix:**
- Pixel events: Real client IP (e.g., `203.0.113.45`)
- CAPI events: Real client IP (e.g., `203.0.113.45`) ← **Same IP!**
- **Result**: IP match → No errors in Meta Events Manager

### How to Verify

1. **Check Browser Console:**
   - Look at `[CAPI] Payload` logs
   - Verify `client_ip_address` is a real IP (not Supabase proxy IP)
   - Compare with your actual IP (check at https://whatismyipaddress.com/)

2. **Check Network Tab:**
   - Inspect the `meta-capi` request payload
   - Verify `client_ip_address` matches your real IP

3. **Check Supabase Logs:**
   - Verify Edge Function receives `client_ip_address` in payload
   - Verify it's sent to Meta CAPI (not extracted from headers)

---

## Step 5: Test Event Flow

### Test Scenario

1. **Page Load:**
   - Open site → Check console for IP fetch
   - First event (`tof_v1_page_view`) may not have IP (OK)
   - Subsequent events should have IP cached

2. **User Interaction:**
   - Click a CTA button
   - Check console - event should have `client_ip_address`
   - Check network - `meta-capi` request should include IP

3. **Form Submission:**
   - Fill out form
   - Submit form
   - Check console - all events should have IP
   - Check network - all CAPI requests should include IP

---

## Troubleshooting

### Issue: IP Not Being Fetched

**Symptoms:**
- No `[ClientInfo]` logs in console
- No `get-client-ip` request in network tab

**Check:**
1. Is `get-client-ip` Edge Function deployed?
2. Are environment variables set correctly?
3. Check browser console for errors

### Issue: IP Fetch Fails

**Symptoms:**
```
[ClientInfo] Failed to fetch IP: 404
```

**Check:**
1. Is `get-client-ip` function name correct?
2. Is function deployed and active?
3. Check Supabase Edge Function logs for errors

### Issue: IP Not in CAPI Events

**Symptoms:**
- IP fetch succeeds, but `meta-capi` payload doesn't include IP

**Check:**
1. Is IP cached? Look for `[ClientInfo] Client IP cached: ...`
2. Check `getAutomaticMetaParams()` is including IP
3. Check `meta-capi` Edge Function is extracting from `user_data.client_ip_address`

### Issue: Meta CAPI Errors

**Symptoms:**
```
[CAPI] Failed to send event: 500
```

**Check:**
1. Supabase Edge Function logs for errors
2. Are `META_ACCESS_TOKEN` and `META_PIXEL_ID` set correctly?
3. Check Meta Events Manager for API errors

---

## Success Criteria

✅ **All of these should be true:**

1. ✅ `get-client-ip` function returns IP address
2. ✅ IP is cached after first fetch
3. ✅ Most events (after initial load) include `client_ip_address`
4. ✅ All events include `client_user_agent`
5. ✅ `meta-capi` Edge Function receives IP in payload (not from headers)
6. ✅ Meta CAPI receives events with `client_ip_address` and `client_user_agent`
7. ✅ No errors in Supabase Edge Function logs
8. ✅ Events successfully sent to Meta (check Meta Events Manager after 24-48 hours)

---

## Next Steps

After verification:
1. **Deploy to production** (if staging works)
2. **Monitor Meta Events Manager** (wait 24-48 hours)
3. **Check diagnostics** - IP mismatch errors should drop from 90% to 5-10%

---

## Quick Reference: Console Log Patterns

### ✅ Good Pattern:
```
[ClientInfo] Fetching client IP from: ...
[ClientInfo] Client IP cached: 203.0.113.45
🎯 META EVENT FIRED: { userData: { client_ip_address: "203.0.113.45", ... } }
[CAPI] Successfully sent event: 200
```

### ⚠️ Acceptable Pattern (Early Events):
```
🎯 META EVENT FIRED: { userData: { client_ip_address: undefined, ... } }
[ClientInfo] Fetching client IP from: ...
[ClientInfo] Client IP cached: 203.0.113.45
🎯 META EVENT FIRED: { userData: { client_ip_address: "203.0.113.45", ... } }
```

### ❌ Bad Pattern:
```
[ClientInfo] Failed to fetch IP: 404
[CAPI] Failed to send event: 500
```
