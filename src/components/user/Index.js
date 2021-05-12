import React from 'react'
import { useHistory } from 'react-router';
import {logout} from '../../requests';
import Header from './Header';

function Index() {
    const history=useHistory();
    return (
        <div>
            <Header/>
            <div className="box">
            <center>
            <h3>Welcome user</h3>
            
            
            
            </center>
            </div>
            
        </div>
    )
}

export default Index
