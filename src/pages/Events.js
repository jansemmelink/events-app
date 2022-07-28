import React, {useState} from 'react';

const Events = () => {
    const [filter, setFilter] = useState("")
    const [matches, setMatches] = useState([])
    const doSearch = async(event) => {
        event.preventDefault();
        const response = await fetch(
            'http://localhost:12345/events?filter='+filter,
            {
                method: "get",
                headers: {
                    "Accept": "application/json",
                }
            });
        const data = await response.json();
        console.log("data: " + data);
        setMatches(data);
    }

    return (
    <>
        <h1>Events</h1>
        <form onSubmit={doSearch}>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
        <ul>
            {matches.map((match) => {
                let link="/event/"+match.id
                return <li key={match.id}><a href={link}>{match.name} ({match.date})</a></li>
            })}
        </ul>
    </>);
};
  
export default Events;