import React, { FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom"
import api from "../services/api"
import { Link } from 'react-router-dom'
import "../styles/conponents/login.In.css";

interface User {
    email: string,
    password: string,
}

export default function Login_In() {

    const [user, setUser] = useState<User>()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { push } = useHistory()

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();


        api.get(`user${email}`)
            .then(({ data }) => setUser(data))
            .catch(({ response }) => {
                const { message, errors } = response.data

                if (!message) {
                    console.log(response)
                    return alert('Failed to fetch user data!')
                }

                console.error(errors)
                alert(message)
            })
        if (!user) {
            alert('This email is not registered!')
            setEmail("")
            setPassword("")

        }
        else if ((email == user.email) && (password == user.password)) {
            push('/app')

        }
        else {
            alert('Password or email is wrong!')
            setEmail("")
            setPassword("")
        }



    }
    return (

        <div className="LoginIn" onSubmit={handleSubmit}>
            <Form>
                <Form.Group className="boxLoginIn" controlId="emailLoginIn">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="boxLoginIn" controlId="passwordLoginIn">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <div className="PositionButtonLoginIn">
                <button className="LoginInClick" type="submit" disabled={!validateForm()}>
                    Sign In
                </button>

            </div>

            <div className="Recover">

                <Link to="/recover" className="Recover-link">
                    I forgot my password
                </Link>

            </div>


        </div>


    );

}