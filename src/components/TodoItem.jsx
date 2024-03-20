import React from 'react'


const TodoItem = ({title,description,isCompleted,updateHandler,deleteHandler,id,createdAt}) => {
  return (
    <div className='flex flex-row ml-5 mt-5 ' >
        <div className='flex flex-row'>
            <h4>Title : {title} </h4>
            <p className='ml-5'>Description : {description}  </p>
            <p className='ml-5'>Time : {createdAt} </p>
            {/* momentjs */} 
        </div>
        <div className='flex flex-row'>
          <h4 className='ml-5'>Task Status : </h4>
          <input className='ml-1' onChange={()=>updateHandler(id)} type='checkbox' checked={isCompleted} />
          <button className='ml-5 border border-2 border-slate-300 hover:bg-red-300 ' onClick={()=>deleteHandler(id)} >Delete</button>
        </div>
    </div>
  )
}

export default TodoItem