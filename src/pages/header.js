import React from 'react'

function Header({ setIsAdding }) {
    return (
        <header>
            {/* <h1>Employee Management Software</h1> */}
            <div style={{ marginTop: '30px', marginBottom: '18px',textAlign:'center' }}>
                <button onClick={() => setIsAdding(true)} className='round-button'>Add Employee</button>
            </div>
            <div style={{ marginTop: '30px', marginBottom: '18px',textAlign:'center' }}> 
                <button onClick={() => setIsAdding(true)} className='round-button'>Add Task</button>
            </div>
        </header>
    )
}

export default Header