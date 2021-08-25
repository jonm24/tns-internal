export default function cleanEvent(event) {
  let new_event = {} // object to be displayed

  new_event.event = Object.keys(event).find(key => key.includes("events")) // get 'odd one out' key 
  new_event.for_user_id = event.for_user_id // get for_user_id

  if (new_event.event === "tweet_create_events") {
    delete event[new_event.event][0].user // delete user data
    new_event.details = JSON.stringify(event[new_event.event][0], null, 2) // stringify the rest of json related to event
  } else {
    new_event.details = JSON.stringify(event[new_event.event][0], null, 2) // stringify the rest of json related to event
  }
  
  new_event.time = new Date(new_event.event === "tweet_create_events"
    ? event[new_event.event][0]["created_at"]
    : Number(event[new_event.event][0]["created_timestamp"])).toLocaleString('en-us') // transform timestamp

  return new_event
} 