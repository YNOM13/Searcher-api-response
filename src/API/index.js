import React, {useEffect, useRef, useState} from 'react';

const Api = () => {
  const [type, setType] = useState('users')
  const [data,setData] = useState([])
  const ALL_USERS = useRef([])
  const [input, setInput] = useState('')

  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json =>{
        ALL_USERS.current = json
        setData(json)
      })
  },[type])

  useEffect(()=>{
    (type === 'users') ?
      setData(
        ALL_USERS.current.filter(i=>i.name.toLowerCase().includes(input.toLowerCase()))
      )
      :
      setData(
        ALL_USERS.current.filter(i=>i.title.toLowerCase().includes(input.toLowerCase()))
      )

  },[input])

  return (
    <div>
      <h1>{type}</h1>
      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button onClick={()=>setType('users')}>Users</button>
      <button onClick={()=>setType('posts')}>Posts</button>
      <button onClick={()=>setType('todos')}>Todos</button>

      {(type === 'users') ?
        <div>
          {data.map(i=><div key={i.id}>{i.name}</div>)}
        </div>
        :(type === 'posts') ?
          <div>
            {data.map(i=><div key={i.id}>{i.title}</div>)}
          </div>
        :   <div>
            {data.map(i=><div key={i.id}>{i.title}</div>)}
          </div>
      }
    </div>
  );
};

export default Api;