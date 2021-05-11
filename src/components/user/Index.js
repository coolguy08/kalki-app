import React from 'react'
import { useHistory } from 'react-router';
import {logout} from '../../requests';

function Index() {
    const history=useHistory();
    return (
        <div>
            <center>
            <h3>Welcome user</h3>
            <a onClick={()=>history.push("/havelead")} className="havelead">Have Leads ?</a>
            <br/>
            <button className="btn btn-primary" onClick={()=>logout(history)}>Logout</button>
            
            </center>
        </div>
    )
}

export default Index
