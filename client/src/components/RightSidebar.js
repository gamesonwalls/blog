import React,{useState,useEffect} from 'react';
import $ from "jquery";
//import axios from 'axios'
import Switch from './Switch'
import { Link } from 'react-router-dom';
import axios from 'axios'

function RightSidebar(props) {

  const [articles,setArticles]=useState([])

  console.log("props from rightsidebar",props)
  useEffect(() => {
    getAllPosts()
   
   
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
          
              return <div className="row">
                            <div className="col-md-4">
                              <img src={r.img_url} style={{height:46,width:"100%",marginBottom:34}}/>
                            </div>
                            <div className="col-md-8">
                                <h4><a href="#0" title="">
                                    <Link  to={{
                                                pathname: cleanedUrl,
                                                state: {
                                                  data: r
                                                }
                                              }}>
                                      {r.post_title}
                                      </Link>
                                  </a>
                                </h4>
                              </div>
                          </div>
                  })
          setArticles(returnData)
            
          
      }).catch(function (error) {
        console.log(error)
  
      });

  }      

  return (
 
 
    
      <div>
           
             <h3>Articles</h3>
             <Switch/>

             {articles}

                
          
      
            

      </div>
  );
}

export default RightSidebar;
