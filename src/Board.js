import { Fragment, useEffect, useState } from 'react';
import Event from './Event';

export default function Board ({ onlyDMs, onlyMentions, data }) {
  const [filtered, setFiltered] = useState(data);

  useEffect(() => setFiltered( 
      onlyDMs && onlyMentions ?
        data.sort((a, b) => new Date(b.time) - new Date(a.time))
            .filter(obj => (obj.event.includes("direct_message_events") || obj.event.includes("tweet_create_events")))
      : onlyDMs ? 
        data.sort((a, b) => new Date(b.time) - new Date(a.time))
            .filter(obj => obj.event.includes("direct_message_events")) 
      : onlyMentions ? 
        data.sort((a, b) => new Date(b.time) - new Date(a.time))
            .filter(obj => obj.event.includes("tweet_create_events"))
      : 
        data.sort((a, b) => new Date(b.time) - new Date(a.time))
    ), [onlyDMs, onlyMentions, data])

  return (
    <Fragment>
      {
        filtered.map((item, index) => (<Event key={index} event={JSON.stringify(item)}/>))
      }
    </Fragment>
  )
}