import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'
import { useLoaderData } from 'react-router-dom'
import { TimeService } from '../openapi-client'

export async function loader() {
  return {
    time: (await TimeService.getTime()).time,
  }
}

interface LoaderData {
  time: string
}

export function Component() {
  const [count, setCount] = useState(0)
  const { time } = useLoaderData() as LoaderData

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="time">
        The current time is {time}
      </p>
    </>
  )
}
