import React from 'react'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'

const App = () => {
  const users = [

    {
      img: 'https://images.unsplash.com/photo-1699619093726-24dbe49158bb?q=80&w=777&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: '',
      color: 'royalblue',
      tag: 'Power'
    },
       {
      img: 'https://plus.unsplash.com/premium_photo-1661559063958-968c8f1928e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: '',
            color: 'lightseagreen',
      tag: 'Underbanked'
    },
    {
      img: 'https://images.unsplash.com/photo-1585554414787-09b821c321c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: '',
            color: 'black ',

      tag: 'Hardwork'
    },

    {  
      img: 'https://images.unsplash.com/photo-1580983218547-8333cb1d76b9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro: '',
            color: 'orange',

      tag: 'UnderServed'},
    {
      img: 'https://plus.unsplash.com/premium_photo-1661634136642-7a4d16900f84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGZlbWFsZSUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D',
      intro: '',
            color: 'pink',

      tag: 'Satisfied'
    }
    
    
 
    
  ]
  return (
    <div>
    <Section1 users={users}/>
    <Section2/>
    </div>
  )
}

export default App
