


import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import { useParams } from 'react-router-dom';
import Auth from '../security/AuthContext';
import welcome from '../assets/welcome.avif';


function Welcome(){

    const navigate = useNavigate();
    const {username} = useParams();
    const Authentication = Auth();

    const send = () =>{
        navigate('/table')
    }

    return <>
        <div className="not-found-container">
            <img className='image' height={"300px"} width={"400vh"} src={welcome} />
                <div className="not-found-content">
                    <center>
                    <h1 className="not-found-heading">Todos Management Applicaiton</h1>
                    <p className="not-found-text">Create, Update and Delete Todos Efficiently!</p>
                    </center>
                </div>
                <br />
                <br />
            <button className="button-27" role="button" style={{"margin":"0px"}} onClick={send}>SHOW TODOs LIST</button>
            <br /><br /><br /><br /><br />
        </div>
    </>;
}


export default Welcome;





