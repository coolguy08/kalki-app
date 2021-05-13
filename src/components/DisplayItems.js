import React,{useState}from 'react'
import moment from 'moment';
import {like,removelike,dislike,removedislike} from '../requests';
function DisplayItems({items}) {

    return (
        <div className="items-container">
            <div className="row">
        {
        
        items.map((item)=>{
            return <Card data={item}/>
        })
            

        }
        
        </div>  
        </div>
    )
}


function Card(props)
{
    const [likes, setlikes] = useState(props.data.likes);
    const [dislikes, setdislikes] = useState(props.data.dislikes)

    function increaselikes()
    {
        setlikes(likes+1);
    }

    function increasedislikes()
    {
        setdislikes(dislikes+1);
    }

    function decreaselikes()
    {
        setlikes(likes-1);
    }

    function decreasedislikes()
    {
        setdislikes(dislikes-1);
    }


    const onlike=async(key)=>
    {
         const d=document.getElementById(key+"like");
         const dislike=document.getElementById(key+"dislike");
         if(d.classList.contains('green'))//like button is cliked already
         {
            d.classList.toggle('green');
             
            decreaselikes();
            removelike(key);
            return;  
         }

         if(dislike.classList.contains('red'))//dislike was clicked earlier but now liked is clicked
         {
            decreasedislikes();
            removedislike(key);
            dislike.classList.toggle('red');   
         }
         increaselikes();
         d.classList.toggle('green');
         const res=await like(key);
        //  console.log(res);

         
    }
    const ondislike=async(key)=>
    {
        const d=document.getElementById(key+"dislike");
        const like=document.getElementById(key+"like");
         if(d.classList.contains('red'))//dislike button is already cliked
         {
            d.classList.toggle('red');
            decreasedislikes();
            removedislike(key);
            return;  
         }

         if(like.classList.contains('green'))//like was cliked earlier but know disliked is cliked
         {
            decreaselikes();
            removelike(key);
            like.classList.toggle('green');   
         }
         d.classList.toggle('red');
         increasedislikes();
         const res=await dislike(key);
        //  console.log(res);
         
         

    }
      
    return (
        <div class="col-sm-4">
        <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">{props.data.type}</h5>
          <h6 class="card-text">Name : {props.data.name}</h6>
          <p class="card-text">{props.data.landmark}</p>
          {props.data.paid?<p class="card-text">💸 Paid</p>:<p class="card-text">🆓 Free</p>}
         {props.data.verified? <p class="card-text">✔️ verified</p>:<p class="card-text">❌ Not verified</p>}
          <p class="card-text"><a href={`tel:`+props.data.phone}>📞 {props.data.phone}</a></p>
          <p class="card-text">{props.data.description}</p>
          
          <div className="btn-grp">
          <button class="like" id={props.data._id+"like"} onClick={()=>{onlike(props.data._id)}}><i class="fa fa-thumbs-up fa-lg" ></i></button>
          <button class="dislike" id={props.data._id+"dislike"} onClick={()=>{ondislike(props.data._id)}}><i class="fa fa-thumbs-down fa-lg" ></i></button>
          </div>
        </div>
        <div class="card-footer text-muted">
            <div className="btn-grp">
               <div>{likes} likes</div>
               <div>{dislikes} dislikes</div>
            </div>
        <br/>
        {moment(new Date(props.data.created_on)).fromNow()}
        </div>
      </div>
      </div>

    )

}

export default DisplayItems
