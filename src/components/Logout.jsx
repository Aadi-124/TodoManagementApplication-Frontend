
import React from 'react';
import './NotFoundPage.css'; // Import CSS file for styling
import logoutimg from '../assets/logout.png';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img className='image' height={"300px"} width={"400vh"} src={logoutimg} />
      <div className="not-found-content">

        <center>
      <h1 style={{fontSize:'30px',fontFamily:'Arial',color:"red"}}>You are Successfully Logged Out!</h1>
               <h2 style={{color:"blue"}}>Thanks for visiting our website</h2>
        </center>
      </div>
    </div>
  );
};

export default NotFoundPage;














// import Auth from "../security/AuthContext";

// export default function(){



//     return(
//         <>

//         <center>
//         <h1 style={{fontSize:'2cm',fontFamily:'Arial',marginTop:'5cm'}}>You are Successfully Logged Out!</h1>
//         <h2>Thanks for visiting our website</h2>
//         </center>
//         </>
//     );

// }