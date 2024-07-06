
import { useLocation } from "react-router-dom";
import OTPInput from "./OTP";
export default function AdminRegistrationotp(){
 
    const location = useLocation();
    const userdata = location.state;
  
    return(
        <>
            <OTPInput
            email={userdata.email} 
            user={userdata}
            />
        </>
    );
}

