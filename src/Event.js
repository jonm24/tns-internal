import { useEffect, useState } from "react";
import './index.css';

function Event({ event }) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(JSON.parse(event));
  }, [event])

  return (
    <div className="event">
      <div style={{display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "space-between"}}>
        <h3 style={{marginBottom: "10px"}}>{data.event}</h3>
        <p style={{marginBottom: "10px"}}><strong>created_timestamp: </strong>{data.time}</p>
      </div>
      <p><strong>for_user_id:</strong> {data.for_user_id}</p>
      <details style={{marginTop: "10px", cursor: "pointer"}}>
        <summary>event data</summary>
        <pre style={{fontSize: "16px", whiteSpace: "pre-wrap"}}>{data.details}</pre>
      </details>
    </div>
  )
}

export default Event;