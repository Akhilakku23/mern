import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import './Properties.css'
import useProperties from '../../hooks/useProperties'

const Properties = () => {

  const { data, isLoading, isError, refetch } = useProperties()
  return (
    <div className='wrapper'>
      <div className="flexColCenter paddings innerWidth properties-container">

           <SearchBar/>
           </div>
    </div>
  )
}

export default Properties