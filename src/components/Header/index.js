import React from 'react';

 import './styles.css';
 import LogoIMG from '../../assets/logo.png'
 import UserIMG from '../../assets/user.png'

export default({black})=>{
  return(
    <header className={black?'black':''}>
      <div className='header--logo'>
        <a href='/'>
          <img src={LogoIMG} alt="Netflix"/>
        </a>
      </div>
      <div className='header--user'>
        <a href='/'>
          <img src={UserIMG}/>
        </a>
        
      </div>
    </header>
  )
}