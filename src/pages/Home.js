import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
const Home = () => {
  let {logoutUser} = useContext(AuthContext)
  return (
    <div>You are in the page
      <button onClick={()=>logoutUser()}>Log out</button>
    </div>
  )
}

export default Home