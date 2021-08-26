import { Fragment } from 'react';
import Event from './Event';

export default function Board ({ onlyDMs, onlyMentions, data }) {
  return (
    <Fragment>
      { 
        onlyDMs && onlyMentions // both filters
        ? data.sort((a, b) => new Date(b.time) - new Date(a.time)).filter(obj => Object.keys(obj).includes("direct_message_events") || Object.keys(obj).includes("tweet_create_events")).map((item, index) => (
          <Event key={index} event={JSON.stringify(item)}/>)) 
        
        : onlyDMs // only direct messages
        ? data.sort((a, b) => new Date(b.time) - new Date(a.time)).filter(obj => Object.keys(obj).includes("direct_message_events")).map((item, index) => (
          <Event key={index} event={JSON.stringify(item)}/>))

        : onlyMentions // only mentions
        ? data.sort((a, b) => new Date(b.time) - new Date(a.time)).filter(obj => Object.keys(obj).includes("tweet_create_events")).map((item, index) => (
          <Event key={index} event={JSON.stringify(item)}/>))
          
        : data.sort((a, b) => new Date(b.time) - new Date(a.time)).map((item, index) => ( // all events
        <Event key={index} event={JSON.stringify(item)}/>))
      }
    </Fragment>
  )
}