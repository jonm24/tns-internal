export default function cleanEvent(event) {
  let new_event = {}

  new_event.event = Object.keys(event).filter(key => !(["for_user_id", "_id", "users"].includes(key)))[0]
  new_event.for_user_id = event.for_user_id
  new_event.details = JSON.stringify(event[new_event.event][0], null, 2)
  new_event.time = new Date(Number(event[new_event.event][0]["created_timestamp"])).toLocaleString('en-us')

  return new_event
} 