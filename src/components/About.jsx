import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function About(){

    const navigate = useNavigate();

    return(
    <>
    <div className="about">

        <div className="about_main_container">
            <div className="about_container about_heading">
                <u>Todo</u> <u> Management</u> <u>Application!</u>
            </div>

            <div className="about_container about_subheading">
            Efficiently Manage your DaytoDay Task with todo management list stay consistant and get successful

            </div>

            <div className="about_container about_description">

A to-do list application, often abbreviated as todo app, is a software program designed to help users manage their tasks and stay organized. It provides a way to create, track, and complete tasks, improving productivity and reducing the mental burden of remembering everything that needs to be done.
            </div>
            <Button variant="contained" color="primary" onClick={()=>{navigate('/')}} style={{backgroundColor:"black",fontSize:"20px"}}> Go back to Home</Button>
        </div>

    </div>
    </>);
}