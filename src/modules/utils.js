import { ref } from 'vue'
import { config, global } from "@/modules/pinia"
import { logDebug, logError, logInfo } from '@/modules/logger'

export const httpHeaderOptions = ref([
  { label: 'JSON data', value: 'Content-Type: application/json' },
  { label: 'Form data', value: 'Content-Type: x-www-form-urlencoded' },
  { label: 'Authorization', value: 'Authorization: Basic {enter token here}' },
  { label: 'No Cache', value: 'Pragma: no-cache' },
  { label: 'User agent', value: 'User-Agent: gravitymon' },
])

export const httpPostUrlOptions = ref([
  { label: 'Brewfather ispindel', value: 'http://log.brewfather.net/ispindel?id=<yourid>' },
  { label: 'Brewfather stream', value: 'http://log.brewfather.net/stream?id=<yourid>' },
  { label: 'UBI dots', value: 'http://industrial.api.ubidots.com/api/v1.6/devices/<devicename>/?token=<api-token>' },
  { label: 'UBI dots secure', value: 'https://industrial.api.ubidots.com/api/v1.6/devices/<devicename>/?token=<api-token>' },
  { label: 'Brewersfriend (P)', value: 'http://log.brewersfriend.com/ispindel/[API KEY]' },
  { label: 'Brewersfriend (SG)', value: 'http://log.brewersfriend.com/ispindel_sg/[API KEY]' },
  { label: 'Brewspy', value: 'http://brew-spy.com/api/ispindel' },
  { label: 'Thingsspeak', value: 'http://api.thingspeak.com/update.json' },
  { label: 'Blynk', value: 'http://blynk.cloud/external/api/batch/update' },
  { label: 'Bierdot bricks', value: 'https://brewbricks.com/api/iot/v1' },
])

export const httpPostFormatOptions = ref([
  { label: "GravityMon", value: "%7B%20%22name%22%20%3A%20%22%24%7Bmdns%7D%22%2C%20%22ID%22%3A%20%22%24%7Bid%7D%22%2C%20%22token%22%20%3A%20%22%24%7Btoken%7D%22%2C%20%22interval%22%3A%20%24%7Bsleep-interval%7D%2C%20%22temperature%22%3A%20%24%7Btemp%7D%2C%20%22temp_units%22%3A%20%22%24%7Btemp-unit%7D%22%2C%20%22gravity%22%3A%20%24%7Bgravity%7D%2C%20%22angle%22%3A%20%24%7Bangle%7D%2C%20%22battery%22%3A%20%24%7Bbattery%7D%2C%20%22RSSI%22%3A%20%24%7Brssi%7D%2C%20%22corr-gravity%22%3A%20%24%7Bcorr-gravity%7D%2C%20%22gravity-unit%22%3A%20%22%24%7Bgravity-unit%7D%22%2C%20%22run-time%22%3A%20%24%7Brun-time%7D%7D" },
  { label: "iSpindle", value: "%7B%20%22name%22%20%3A%20%22%24%7Bmdns%7D%22%2C%20%22ID%22%3A%20%22%24%7Bid%7D%22%2C%20%22token%22%20%3A%20%22%24%7Btoken%7D%22%2C%20%22interval%22%3A%20%24%7Bsleep-interval%7D%2C%20%22temperature%22%3A%20%24%7Btemp%7D%2C%20%22temp_units%22%3A%20%22%24%7Btemp-unit%7D%22%2C%20%22gravity%22%3A%20%24%7Bgravity%7D%2C%20%22angle%22%3A%20%24%7Bangle%7D%2C%20%22battery%22%3A%20%24%7Bbattery%7D%2C%20%22RSSI%22%3A%20%24%7Brssi%7D%7D" },
  { label: "BrewFatherCustom", value: "%7B%20%20%20%22name%22%3A%20%22%24%7Bmdns%7D%22%2C%20%20%20%22temp%22%3A%20%24%7Btemp%7D%2C%20%20%20%22aux_temp%22%3A%200%2C%20%20%20%22ext_temp%22%3A%200%2C%20%20%20%22temp_unit%22%3A%20%22%24%7Btemp-unit%7D%22%2C%20%20%20%22gravity%22%3A%20%24%7Bgravity%7D%2C%20%20%20%22gravity_unit%22%3A%20%22%24%7Bgravity-unit%7D%22%2C%20%20%20%22pressure%22%3A%200%2C%20%20%20%22pressure_unit%22%3A%20%22PSI%22%2C%20%20%20%22ph%22%3A%200%2C%20%20%20%22bpm%22%3A%200%2C%20%20%20%22comment%22%3A%20%22%22%2C%20%20%20%22beer%22%3A%20%22%22%2C%20%20%20%22battery%22%3A%20%24%7Bbattery%7D%7D" },
  { label: "UBIDots", value: "%7B%20%20%20%22temperature%22%3A%20%24%7Btemp%7D%2C%20%20%20%22gravity%22%3A%20%24%7Bgravity%7D%2C%20%20%20%22angle%22%3A%20%24%7Bangle%7D%2C%20%20%20%22battery%22%3A%20%24%7Bbattery%7D%2C%20%20%20%22rssi%22%3A%20%24%7Brssi%7D%7D" },
])

export function validateCurrentForm() {
  let valid = true
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    if (!form.checkValidity())
      valid = false

    form.classList.add('was-validated')
  })

  return valid
}

export function tempToF(c) {
  return (c * 1.8) + 32.0
}

export function tempToC(f) {
  return (f - 32.0) / 1.8
}

export function applyTemplate(status, config, template) {
  var s = template

  s = s.replaceAll("${temp}", status.temp)

  var c = status.temp
  var f = status.temp

  if (config.temp_format === 'C') {
    f = tempToF(status.temp)
  } else {
    c = tempToC(status.temp)
  }

  // TODO: Adjust the template values that are needed

  s = s.replaceAll("${temp-c}", c)
  s = s.replaceAll("${temp-f}", f)
  s = s.replaceAll("${angle}", status.angle)
  s = s.replaceAll("${tilt}", status.angle)
  s = s.replaceAll("${app-ver}", status.app_ver)
  s = s.replaceAll("${app-build}", status.app_build)
  s = s.replaceAll("${battery-percent}", 100)
  s = s.replaceAll("${rssi}", status.rssi)
  s = s.replaceAll("${run-time}", status.runtime_average)
  s = s.replaceAll("${corr-gravity}", status.gravity)
  s = s.replaceAll("${battery}", status.battery)

  if (config.gravity_format === 'G') {
    var sg = status.gravity
    s = s.replaceAll("${gravity}", sg)
    s = s.replaceAll("${gravity-sg}", sg)
    s = s.replaceAll("${corr-gravity-sg}", sg)
    var plato = 259 - (259 - sg);
    s = s.replaceAll("${gravity-plato}", plato)
    s = s.replaceAll("${corr-gravity-plato}", plato)
  } else {
    var plato = status.gravity
    s = s.replaceAll("${gravity}", plato)
    s = s.replaceAll("${gravity-plato}", plato)
    s = s.replaceAll("${corr-gravity-plato}", plato)
    var sg = 259 / (259 - plato)
    s = s.replaceAll("${gravity-sg}", sg)
    s = s.replaceAll("${corr-gravity-sg}", sg)
  }

  s = s.replaceAll("${mdns}", config.mdns)
  s = s.replaceAll("${id}", config.id)
  s = s.replaceAll("${sleep-interval}", config.sleep_interval)
  s = s.replaceAll("${token}", config.token)
  s = s.replaceAll("${token2}", config.token2)
  s = s.replaceAll("${temp-unit}", config.temp_format)
  s = s.replaceAll("${gravity-unit}", config.gravity_format)

  try {
    return JSON.stringify(JSON.parse(s), null, 2)
  } catch (e) {
    logError("utils.applyTemplate()", "Not a valid json document, returning string")
  }

  return s
}

export function isValidJson(s) {
  try {
    JSON.stringify(JSON.parse(s))
    return true
  } catch (e) {
  }

  return false
}

export function isValidFormData(s) {
  if (s.startsWith('?'))
    return true

  return false
}

export function isValidMqttData(s) {
  if (s.indexOf('|') >= 0)
    return true

  return false
}

export function getErrorString(code) {
  switch (code) {
    case 200: return "Success (200)"
    case 401: return "Access denied (401)"
    case 404: return "Endpoint not found (404)"
    case 422: return "Paylod cannot be parsed, check format and http headers"
  }

  return "Unknown code, check documentation (" + code + ")"
}


export function restart() {
  global.clearMessages()
  global.disabled = true
  fetch(global.baseURL + 'api/restart', { 
      headers: { "Authorization": global.token }, 
      signal: AbortSignal.timeout(global.fetchTimout),
  })
      .then(res => res.json())
      .then(json => {
          logDebug("utils.restart()", json)
          if (json.status == true) {
              global.messageSuccess = json.message + " Redirecting to http://" + config.mdns + ".local in 8 seconds."
              logInfo("utils.restart()", "Scheduling refresh of UI")
              setTimeout(() => { location.href = "http://" + config.mdns + ".local" }, 8000)
          } else {
              global.messageError = json.message
              global.disabled = false
          }
      })
      .catch(err => {
          logError("utils.restart()", err)
          global.messageError = "Failed to do restart"
          global.disabled = false
      })
}