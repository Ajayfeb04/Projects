import React from 'react'

const RightCardContent = (props) => {
  // console.log(props);
  
  return (
    
      <div className='absolute top-0 left-0 h-full w-full  p-7 flex flex-col justify-between'>

          <h2 className='bg-white rounded-full text-xl font-semibold h-9 w-9 flex justify-center items-center'>{props.id+1}</h2>
          <div>
            <p className='text-lg leading-relaxed text-white mb-12'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quibusdam dolores explicabo rerum voluptates placeat!</p>
            <div className='flex justify-between'>
                <button style={{backgroundColor:props.color}} className=' text-white font-medium px-8 py-3 rounded-full'>{props.tag}</button>
                <button className=' text-white font-medium px-4 py-3 rounded-full'><i className="ri-arrow-right-line"></i></button>
            </div>
          </div>
       </div>
    
  )
}

export default RightCardContent
