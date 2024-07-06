
import OTPInput from "./OTP";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ForgotOTP(){

    const location = useLocation();
    const user = location.state;

    return (
        <>
            <OTPInput
                user = {user}
            />

        </>
    );
}