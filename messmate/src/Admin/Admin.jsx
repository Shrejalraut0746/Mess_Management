import React from 'react'
import Sidebar from './Components/Sidebar'

const Admin = () => {
  return (
    <div>
      <main main className="flex position-relative gap-[1rem]">
        <div className="flex-[2]">
            <Sidebar/>
        </div>

      </main>
    </div>
  )
}

export default Admin
