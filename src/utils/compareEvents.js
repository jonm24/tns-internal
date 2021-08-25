export default function compareEvents(a, b) {
  let a_name = Object.keys(a).filter(key => !(["for_user_id", "_id", "users"].includes(key)))[0]
  let b_name = Object.keys(b).filter(key => !(["for_user_id", "_id", "users"].includes(key)))[0]

  let a_date = new Date(Number(a[a_name][0]["created_timestamp"]))
  let b_date = new Date(Number(b[b_name][0]["created_timestamp"]))

  if (b_date - a_date > 0) {
    return 1
  } else if (b_date - a_date < 0) {
    return -1
  } else {
    return 0
  }
}