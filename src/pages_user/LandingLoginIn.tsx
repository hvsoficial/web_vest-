import { render } from "@testing-library/react";
import React, { FormEvent, useState } from "react";
import Login_In from "../conponentes/Login.In"
import Login_Up from "../conponentes/Login.Up"
//import "../styles/pages/landingLogin.css"


const Login: React.FC = () => {

    const [login, setLogin] = useState(1);

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        alert('This email is already being used!')
        return <Login_In />



    }


    return (
        <div id="Login-page" style={{ background: '#00bf71', color: 'none', display: 'flex' }}>
            <form className="Login-estabelecimento-form" >
                <div className="Login-Loding" onSubmit={handleSubmit}>
                    <div className="login-html">

                        <label htmlFor="tab-1" className="tab" style={{ color: 'black' }}>Sign Up</label>
                        {/*                            
                             <input id="tab-1" type="radio" value={login} name="tab" className="sign-in" />
                            <label htmlFor="tab-1" className="tab">Sign In</label>

                            <input id="tab-2" type="radio" value="signup" name="tab" className="sign-up" />
                            <label htmlFor="tab-2" className="tab">Sign Up</label> 
                            
                                                {login
                        ? (
                            <Login_In />
                        ) : (
                            <Login_Up />
                        )}
                            */}
                        {login
                            ? (
                                <Login_In />
                            ) : (
                                <Login_Up />
                            )}

                    </div>
                </div>


            </form>


        </div >
    );
}

export default Login