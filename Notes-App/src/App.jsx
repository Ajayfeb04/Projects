import React, { useState } from 'react'



const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState([])


  const submitHandler = (e)=>{
    e.preventDefault()
 const copyTask =[...task];
 copyTask.push({title,details})
 setTask(copyTask)
 
 

    setTitle('')
    setDetails('')
  }
  const deleteNote = (idx) => {
    const copyTask = [...task];

    copyTask.splice(idx, 1)

    setTask(copyTask)
  }

  return (
    <div className='h-screen lg:flex bg-black text-white'>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className='flex gap-4 lg:w-1/2 flex-col items-start p-10'>
      <h1 className='text-4xl font-bold'>Add Notes</h1>
       

        <input 
       type='text' 
       placeholder='Enters Notes Heading'
       className='px-5 w-full font-medium py-2 border-2 outline-none rounded'
       value={title}
       onChange={(e)=>{
        setTitle(e.target.value)
       }}
       />


      <textarea
      type='text'
      className='px-5 w-full h-32 font-medium py-2 outline-none border-2 rounded'
      placeholder='Write Details'
      value={details}
      onChange={(e)=>{
        setDetails(e.target.value)
      }}
       />


       <button className='bg-white active:scale-95 w-full outline-none font-medium text-black px-5 py-2 rounded'
       >
        Add Notes</button>

      </form>
      <div className='lg:w-1/2  lg:border-l-2  p-10'>
      <h1 className='text-4xl font-bold'>Recent Notes</h1>
        <div className='flex flex-wrap items-start justify-start gap-5 mt-5 h-full overflow-auto'>
        {task.map(function(elem, idx){
          return <div key={idx} className='flex justify-between flex-col items-start relative h-52 w-40 rounded-xl text-black bg-cover pt-9 pb-4 px-4 bg-[url()]  bg-white'>
          <div>
            <h3 className='leading-tight text-lg font-bold'>{elem.title}</h3>
            <p className='mt-4 leading-tight text-sm font-medium text-gray-500'>{elem.details}</p>
          </div>
            <button onClick={() => {
                deleteNote(idx)}} className='w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs text-white rounded font-bold'>Delete</button>
          </div>
        
        })}
        </div>
      </div>
    </div>
  )
}

export default App
