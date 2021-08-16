import React,{useState,useEffect} from 'react';
import {getleadsbyemail,removelead} from '../../requests';
import Loading from '../Loading';
import moment from 'moment';
import Header from './Header';


function MyLeads() {
  
  const [loading, setloading] = useState(false);
  
  //this is for the reponse comming from api
  const [items, setitems] = useState([]);

 useEffect(() => {
     search();
     return () => {
        
     }
 }, [])


async function search()
{
    setloading(true);
    const data={token:localStorage.token}
    const d=await getleadsbyemail(data);
    if(d)
    {
      setitems(d.data);
      
    }
    else
    {
      console.log("Server Error Occured");
    }
    
    
    setloading(false);
    
}

if(loading)
{

  return <><Header/><Loading/></>;
}

  return (
  
    <div className="App">
      
     <Header/>
      <div className="box">
      {items && items.length>0?<Display items={items}/>:<center><div><p>No Data Found</p></div></center>}
      </div>
  </div>
   
  );
}


function Display(props)
{
    const [items, setitems] = useState(props.items)
    const [removing, setremoving] = useState(false);
   
    async function remove(key)
    {
        setremoving(key);
        
        const d=await removelead({leadid:key,token:localStorage.token});
        if(d && d.status)
        {
            setitems(items.filter(function(val){return val._id!=key}));
        }
        else
        {
            alert('error occured');
        }
        setremoving('');
        
        
    }


   
    return (
       <>
       <div className="row">
       {
           items.map((item)=>{
               return <Card  key={item._id} data={item} remove={remove}  removing={removing}/>;
           })
       }
       </div>
       </>
    )
}


function Card(props)
{
      
    return (
        <div class="col-sm-4" id={props._id}>
        <div class="card text-center">
        
        <div class="card-body">
        <h5 class="card-title">{props.data.type}</h5>
          <h6 class="card-text">Name : {props.data.name}</h6>
          <p class="card-text">{props.data.landmark}</p>
          <p class="card-text">{props.data.phone}</p>
          <div class="btn-grp">
          {props.data.paid?<p class="card-text">💸 Paid</p>:<p class="card-text">🆓 Free</p>}
         {props.data.verified? <p class="card-text">✔️ verified</p>:<p class="card-text">❌ Not verified</p>}
          </div>
          <div className="btn-grp">
          <button class="btn btn-danger" onClick={()=>props.remove(props.data._id)}>{props.removing==props.data._id?'Removing...':'Remove'}</button>
          </div>
          
        </div>
        <div class="card-footer text-muted">
            <div className="btn-grp">
                  <div>{props.data.likes} likes</div>
                  <div>{props.data.dislikes} dislikes</div>
                </div>
            <br/>
          {moment(new Date(props.data.created_on)).fromNow()}
        </div>
      </div>
      </div>

    )

}

export default MyLeads;
