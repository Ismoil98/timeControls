import { useEffect, useState } from 'react'

function App() {
  const [second, setSecond] = useState(0)
  const [minut, setMinut] = useState(0)
  const [hour, setHour] = useState(0)
  const [active, setActive] = useState(false)
  const [intervals, setIntervals] = useState([])  

  useEffect(()=>{
    let interval;
    if(active) {
      interval = setInterval(()=> {
        if(second>58) {
          setSecond(0)
          setMinut(minut+1)
          if (minut > 58) {
            setMinut(0)
            setHour(hour+1)
          }
        } else {
          setSecond(second+1)
        }
      }, 10)
    }
    return ()=> clearInterval(interval)
  }, [active, second])

  const start_stop = () =>{
    setActive(!active)
  }
  const reset = () => {
   setActive(false)
   setSecond(0) 
   setMinut(0) 
   setHour(0) 
   setIntervals([])
  }
  const save_intervals = ()=> {
    if (second || minut || hour)
    intervals.push(`${hour}:${minut}:${second}`)
    setIntervals([...intervals])
  }

  return (
    <>
      <div className='container offset-3 mt-4'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-header'>
                <h1 className='text-center text-info'>
                  Secondomer
                </h1>
                <h2 className='text-center text-success'>H:M:S</h2>
              </div>
              <div className='card-body'>
                <h2 className='text-center'>
                  {hour}:{minut}:{second}
                </h2>
              </div>
              <div className='card-footer d-flex justify-content-center gap-3'>
                <button className={active ? 'btn btn-danger' : 'btn btn-success'} onClick={start_stop}>
                  {active ? 'stop' : 'start'}
                </button>
                <button className='btn btn-info' onClick={reset}>Reset</button>
                <button className='btn btn-primary' onClick={save_intervals}>Interval</button>
              </div>
            </div>
            {
              intervals.map((item, index)=> {
                return <div key={index}>{index+1})   {item}</div>
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App