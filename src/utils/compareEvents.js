export default function compareEvents(a, b) {
  // get 'odd one out' key
  let a_name = Object.keys(a).find(key => key.includes("events"))
  let b_name = Object.keys(b).find(key => key.includes("events"))

  // transform timestamps into date objects
  let a_date = new Date(a_name === "tweet_create_events" 
    ? a[a_name][0]["created_at"]
    : Number(a[a_name][0]["created_timestamp"]))
  let b_date = new Date(b_name === "tweet_create_events"
    ? b[b_name][0]["created_at"]
    : Number(b[b_name][0]["created_timestamp"]))

  // compare timestamps
  return (b_date - a_date > 0) ? 1 : (b_date - a_date) ? -1 : 0
}