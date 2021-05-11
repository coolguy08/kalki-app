import React from 'react'

function DisplayItems({items}) {

    return (
        <div>
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
        <div class="card-header">
          {props.data.type}
        </div>
        <div class="card-body">
          <h5 class="card-title">{props.data.name}</h5>
          <p class="card-text">{props.data.landmark}</p>
          <a href="#" class="btn btn-primary">call</a>
        </div>
        <div class="card-footer text-muted">
          2 days ago
        </div>
      </div>
      </div>

    )

}

export default DisplayItems
