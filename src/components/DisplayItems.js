import React from 'react'
import moment from 'moment';
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
      
    return (
        <div class="col-sm-4">
        <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title">{props.data.type}</h5>
          <h6 class="card-text">Name : {props.data.name}</h6>
          <p class="card-text">{props.data.landmark}</p>
          <p class="card-text">{props.data.paid?'Paid':'Free'}</p>
          <p class="card-text">{props.data.verified?'verified':'Not verified'}</p>
          <p class="card-text">{props.data.phone}</p>
          <p class="card-text">{props.data.description}</p>
          <a href="#" class="btn btn-primary">call</a>
        </div>
        <div class="card-footer text-muted">
        {moment(new Date(props.data.created_on)).fromNow()}
        </div>
      </div>
      </div>

    )

}

export default DisplayItems
