import { useState, useEffect } from 'react'; 
import Event from './Event.js';
import compareEvents from './utils/compareEvents';

function App() {
  const [data, setData] = useState([]);
  const [onlyDMs, setDMs] = useState(false);
  const [onlyMentions, setMentions] = useState(false);

  useEffect(() => {
    console.log("fetching events...")
    fetch("https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tweetnsour-ppfir/service/events/incoming_webhook/get_events")
      .then(resp => resp.json())
      .then(data => setData(data))
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
      { 
        onlyDMs && onlyMentions // both filters
        ? data.sort(compareEvents).filter(obj => Object.keys(obj).includes("direct_message_events") || Object.keys(obj).includes("tweet_create_events")).map((item, index) => (
          <Event key={index} event={JSON.stringify(item)}/>)) 
        
        : onlyDMs // only direct messages
        ? data.sort(compareEvents).filter(obj => Object.keys(obj).includes("direct_message_events")).map((item, index) => (
          <Event key={index} event={JSON.stringify(item)}/>))

        : onlyMentions // only mentions
        ? data.sort(compareEvents).filter(obj => Object.keys(obj).includes("tweet_create_events")).map((item, index) => (
          <Event key={index} event={JSON.stringify(item)}/>))
          
        : data.sort(compareEvents).map((item, index) => ( // all events
        <Event key={index} event={JSON.stringify(item)}/>))
      }
    </div>
  );
}

export default App;
