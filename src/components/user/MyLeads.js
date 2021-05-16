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

  return <Loading/>;
}

  return (
  
    <div className="App">
      
     <Header/>
      <div className="box">
      {items && items.length>0?<Display items={items}/>:<div><p>No Data Found</p></div>}
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
               return <Card  data={item} remove={remove}  removing={removing}/>;
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
          <h5 class="card-title">{props.data.name}</h5>
          <p class="card-text">{props.data.landmark}</p>
          <p class="card-text">{props.data.phone}</p>
          <p class="card-text">{props.data.paid?'Paid':'Free'}</p>
          <div className="btn-grp">
          <button class="btn btn-danger" onClick={()=>props.remove(props.data._id)}>{props.removing==props.data._id?'Removing...':'remove'}</button>
          </div>
          
        </div>
        <div class="card-footer text-muted">
          {moment(new Date(props.data.created_on)).fromNow()}
        </div>
      </div>
      </div>

    )

}

export default MyLeads;
