import React from 'react'
import { useHistory } from 'react-router'

function Header() {
    const history=useHistory();
    return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <a class="navbar-brand" href="#">&nbsp;&nbsp;&nbsp;Kalki</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <a class="nav-link" onClick={()=>history.push("/")}>Home</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" onClick={()=>history.push("/signin")}>Login</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" onClick={()=>history.push("/register")}>Register</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="#">About</a>
            </li>
            
            </ul>
        
        </div>
        </nav>
    </div>
    )
}

export default Header