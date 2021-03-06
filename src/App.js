import React, {useEffect, useState} from 'react';
import './App.css'

import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'; //lista de filmes e séries
import FeaturedMovie from './components/FeaturedMovie'; //destaque que aparece na home
import Header from './components/Header'
import LoadingIMG from '../src/assets/loading.gif'

export default()=>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () =>{
      //catching all list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //catching featured movie or serie
      let originals = list.filter(i=>i.slug==='originals')
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

      setFeaturedData(chosenInfo);
    }
    loadAll();
  },[])

  useEffect(()=>{  
    const scrollListener = () =>{
      if(window.scrollY>10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);
    return ()=>{
      window.removeEventListener('scroll', scrollListener);
    }
  },[])

  return (
    <div className="page">
      <Header black={blackHeader}/>

      {featuredData&&
      <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
      </section>
      {movieList.length<=0 &&
        <div className='loading'>
          <img src={LoadingIMG} alt="Carregando"/>
        </div>
      }
    </div>
  );
}