import React from 'react'
import { useHistory } from 'react-router'
import {logout} from '../../requests'
function Header() {
    const history=useHistory();
    return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">&nbsp;&nbsp;&nbsp;Kalki</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <a class="nav-link" onClick={()=>history.push("/dashboard")}>Dashboard</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" onClick={()=>history.push("/havelead")}>Have Leads?</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" onClick={()=>history.push("/myleads")}>My Leads</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" onClick={()=>logout(history)}>Logout</a>
            </li>
            
            </ul>
        
        </div>
        </nav>
    </div>
    )
}

export default Header
