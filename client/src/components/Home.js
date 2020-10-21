import React,{useState,useEffect,useContext} from 'react';

import Login from './Login'
import Sidebar from './Sidebar'
import axios from 'axios'
import { Modal } from 'antd';
import $ from "jquery";
import { AiFillFacebook as Facebook, AiFillTwitterSquare as Twitter,AiFillLinkedin as LinkedIn } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import ThemeContext from './context/ThemeContext';
import LoginContext from './context/LoginContext';

import RightSidebar from './RightSidebar';
import NavBar from './NavBar';




import Footer from './Footer';


import userProfile from '../assets/img/pic.jpg'
import Switch from './Switch'
import Switchbutton from './Switch';
// var fs =require('fs');
let storageArray=[]

function closeBootsrapModal(){
  // $("#myModal").modal('hide')
   $('#myModal').hide();
   $(".modal-backdrop").css("position","initial")
}

function Home() {



  const [location,setLocation]=useState(null)
  const [isLogin,setisLogin]=useState(false)
  const [isLoading,setisLoading]=useState(true)
  const [userName,setuserName]=useState(null)
  const [visible,setVisible]=useState(false);
  const [visible2,setVisible2]=useState(false);
  const [visible3,setVisible3]=useState(false);
  const [articles,setArticles]=useState([])

  const [firstArticle,setfirstArticle]=useState([])
  const [secondThirdArticle,setsecondThirdArticle]=useState([])
  const [otherArticles,setotherArticles]=useState([])

  // const [userSearch,setuserSearch]=useState('Search with a City or Country')
 
  const { dark } = useContext(ThemeContext);


  useEffect(() => {
    setisLoading(true)
    getAllPosts()
   setTimeout(function(){
      setisLoading(false)
   },2000)
   
   
  }, []);

 
  
  function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }

  function urlCleaner(title){
   return title.replace(/\s+/g, '-').toLowerCase();
  }


  function getAllPosts(){
   
    axios.get('/api/getAllPosts/')
    .then(response => {
        console.log("from post",response.data);
       

      
       let returnData= response.data.map((r,index)=>{

         let descriptionTrunc=truncateString(r.content["blocks"][0].text,120);
         let cleanedUrl=urlCleaner(r.post_title)
    
          if(index===0){
            return <div className="featured__column featured__column--big">
            <div className="entry" style={{backgroundImage: `url(${r.img_url})`}}>
                
                <div className="entry__content">
                    <span className="entry__category"><a href="#0">{r.category}</a></span>

                  
                    <h1><a href="#0" title="">
                        <Link  to={{
                                    pathname: cleanedUrl,
                                    state: {
                                      data: r
                                    }
                                  }}>
                          {r.post_title}
                          </Link>
                      </a>
                    </h1>

                    <div className="entry__info">
                        <a href="#0" className="entry__profile-pic">
                            <img className="avatar" src={userProfile} alt=""/>
                        </a>

                        <ul className="entry__meta">
                            <li><a href="#0">Eturu Stephen</a></li>
                            <li>21 October, 2020</li>
                        </ul>
                    </div>
                </div>
                
            </div>
          </div>

        }
            
        })
       setfirstArticle(returnData)

      // let images=['','https://www.theafricareport.com/media/2020/10/RTX82HPS.jpg','https://www.gardentech.com/-/media/Images/GardenTech-NA/US/blog/How-to-Grow-Your-Own-Tasty-Strawberries/Strawberries-Header-OG.jpg']
       let returnData2= response.data.map((r,index)=>{

        let descriptionTrunc=truncateString(r.content["blocks"][0].text,120);
        let cleanedUrl=urlCleaner(r.post_title)
   
         if(index===1 || index===2 ){
           return <div className="entry" style={{backgroundImage: `url(${r.img_url})`}} >
                                      
                    <div className="entry__content">
                        <span className="entry__category"><a href="#0">{r.category}</a></span>

                        <h1><a href="#0" title="">
                            <Link  to={{
                                        pathname: cleanedUrl,
                                        state: {
                                          data: r
                                        }
                                      }}>
                              {r.post_title}
                              </Link>
                            </a>
                        </h1>

                            <div className="entry__info">
                                <a href="#0" className="entry__profile-pic">
                                    <img className="avatar" src="images/avatars/user-03.jpg" alt=""/>
                                </a>

                                <ul className="entry__meta">
                                    <li><a href="#0">Eturu Stephen</a></li>
                                    <li>21 October, 2020</li>
                                </ul>
                            </div>
                    </div> 
                  
                </div> 

       }
           
       })

       setsecondThirdArticle(returnData2)

       let returnData3= response.data.map((r,index)=>{

        let descriptionTrunc=truncateString(r.content["blocks"][0].text,120);
        let cleanedUrl=urlCleaner(r.post_title)
   
        if(index>2){
           return <div  className="col-md-4 card" id="cardBackground">
                  <div className="entry__thumb">
                  <img src={r.img_url} className="img-responsive center-block" style={{marginTop: "10px",height: "231px",width: "100%"}} alt=""/>
                  </div>
                  <div className="entry__header">
                      
                      <div className="entry__date ">
                          <a id="">21st October,2020</a>
                      </div>
                      <h2 className="entry__title ">
                      <a id="">
                      <Link  to={{
                                        pathname: cleanedUrl,
                                        state: {
                                          data: r
                                        }
                                      }}>
                              {r.post_title}
                      </Link>
                      </a>
                      
                      </h2>
                      
                  </div>
                  <div className="entry__excerpt " style={{fontSize: "1.5rem",lineHeight: 1.8,textAlign: "justify"}}>
                      <p id="">
                         {descriptionTrunc}
                      </p>
                  </div>
                  
                </div>

        }
           
       })
      setotherArticles(returnData3)


      //  
     

      }).catch(function (error) {
      console.log(error)

      });
  }
  

function signUpUser(e){
  e.preventDefault()

  let username= document.getElementById('username').value;
  let password= document.getElementById('password').value;
  let conf_password= document.getElementById('conf_password').value;

  if(password===conf_password){
  let user=[]
    user.push( {
      username:username,
      password:password
      }
    )

    localStorage.setItem('users',JSON.stringify(user))
      alert('Sign Up successful')

      let users= JSON.parse(localStorage.getItem('users'));
      console.log("users in system",users)
    //let updatedJSONData = JSON.stringify(user)

  }else{
    alert('password mismatch')
  }
 

}


  return (
  
  <div>

    {isLoading===true && 
                  <div className="col-md-12">
                      
                        <div id="preloader">
                      <div id="loader">
                          <div className="line-scale">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                          </div>
                      </div>
                      </div>

                  </div>
                }


      {isLoading===false && 
      <div>

          <section className="s-pageheader s-pageheader--home">
              
              <NavBar/>
                      <div className="pageheader-content">
                          <div className="container">
                              <a> <Switchbutton/></a>
                              <div className="featured">
                                  {firstArticle}
                                  <div className="featured__column featured__column--small">

                                    {secondThirdArticle}
                                  </div>  

                          </div>
                        </div>
                      </div>


            </section>
            
            <section className="s-content" id="downBackground">
                      <div className="container">
                            {otherArticles}
                      </div>
                  
            </section>

            <Footer/> 

      </div> 

      
        

      }
         
     
  </div>
  );
}

export default Home;
