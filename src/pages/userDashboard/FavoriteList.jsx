import React from 'react'
import ServiceCard from '../../components/ServiceCard'
import { useSelector } from 'react-redux'

export default function favoriteList() {

  // get favorite list from redux store
  const favoriteList = useSelector(state => state.favorites)
  console.log(favoriteList);
  


  return (
    <div>
      {favoriteList.length ? (
        <div className="bg-muted p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteList.map((favorite) => (
            <ServiceCard key={favorite.id} favorite={favorite} />
          ))}
        </div>
      ) : (
        <div className="f flex items-center justify-center">
          <p className="text-foreground text-8xl">No favorites found.</p>
        </div>
      )}


    </div>
  )
}
