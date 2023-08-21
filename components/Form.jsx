'use client'
import React from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation";

const Form = () => {
  const router = useRouter()
  const [GPA, setGPA] = useState(0)
  const [department, setdepartment] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    // check if gpa is valid
    if (GPA < 0 || GPA > 4) {
      alert("GPA must be between 0 and 4")
      return
    }

    const data = {
      GPA: GPA,
      department: department
    }

    fetch("http://localhost:3000/api/form",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log(res)
      router.push("/")
    }).catch((err) => {
      console.log(err)
    })
  
  }


  return (
     <form onSubmit={handleRegister} className='flex flex-col space-y-5 shadow-lg p-9 rounded-lg'>
        <label className='text-3xl my-5 font-semibold'>
          GPA:
          <input required type="number" value={GPA} onChange={(e) => setGPA(e.target.value)} className='form_input' />
        </label>
        <label className='text-3xl my-5 font-semibold'>
          Department:
          <select required value={department} onChange={(e) => setdepartment(e.target.value)} className='form_input'>
            <option value="">Select Department</option>
            <option value="CS">CS</option>
            <option value="EE">EE</option>
            <option value="SE">SE</option>
          </select>
        </label>
        <button type="submit" className=" border-amber-500 border-2 rounded-md p-2 text-2xl font-bold text-orange-600 hover:bg-slate-100">Register</button>
      </form>
  )
}

export default Form