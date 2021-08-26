import { useState, useEffect } from 'react'; 
import Board from './Board';
import cleanEvent from './utils/cleanEvent';

function App() {
  const [data, setData] = useState([]);
  const [onlyDMs, setDMs] = useState(false);
  const [onlyMentions, setMentions] = useState(false);

  useEffect(() => {
    console.log("fetching events...")
    fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tweetnsour-ppfir/service/events/incoming_webhook/get_events")
      .then(resp => resp.json()) // make json
      .then(data => data.map(event => cleanEvent(event))) // clean event data 
      .then(data => setData(data)); // set state
  }, [])

  return (
    <div className="container">
      <h2 style={{margin: "20px"}}>tweetnsour twitter events</h2>
      <div className="filters">
        <p style={{marginRight: "10px"}}><strong>filters:</strong></p>
        <button 
          style={onlyDMs ? {backgroundColor: "black", color: "white"} : {backgroundColor: "lightgray", color: "black"} } 
          className="btn"
          onClick={() => setDMs(!onlyDMs)}>
          Direct Messages
        </button>
        <button 
          style={onlyMentions ? {backgroundColor: "black", color: "white"} : {backgroundColor: "lightgray", color: "black"} } 
          className="btn"
          onClick={() => setMentions(!onlyMentions)}>
          Mentions
        </button>
      </div>
      {/* display events  */}
      <Board onlyDMs={onlyDMs} onlyMentions={onlyMentions} data={data}/> 
    </div>
  );
}

export default App;
