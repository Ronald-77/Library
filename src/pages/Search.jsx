import React from 'react'
import useTheme from '../hooks/useTheme'



export default function Search() {

  let {isDark} = useTheme();
  return (
    <div className={isDark? 'text-white' : ''}>
      Search
    </div>
  )
}
