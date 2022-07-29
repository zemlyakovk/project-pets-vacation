import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios';
import SitterProfileCard from '../../components/SitterProfileCard/SitterProfileCard'
import SitterProfileList from '../../components/SitterProfileList/SitterProfileList'


export default function SitterDetail() {
  const params = useParams()
  const [sitter, setSitter] = useState()

  const getSitter = () => {
    axios.get(`/sitters/profile/${params.id}`).then((data) => { setSitter(data.data) })

  }

  useEffect(() => {
    getSitter()
  }, [])

  return (
    <div className='flex flex-row justify-center'>
      <SitterProfileCard sitter={sitter} />
      <SitterProfileList sitter={sitter} />
    </div>
  )
}

