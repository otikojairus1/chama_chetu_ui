import React from 'react'
import { Link, useLocation } from "react-router-dom";

export default function MyGroup() {
  let location = useLocation();
React.useEffect(()=>console.log(location))
  return (
    <div>MyGroup</div>
  )
}
