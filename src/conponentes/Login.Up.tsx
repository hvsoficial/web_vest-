import React, { FormEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom"
import api from "../services/api"
import "../styles/conponents/login.Up.css";

interface User {
    email: string,
}


export default function Login() {

    const [user, setUser] = useState<User>()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const { push } = useHistory()

    function validateForm() {
        if ((password1.length > 0) && (password2.length > 0)) {
            return email.length > 0 && name.length > 0;
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const password = password1

        const data = new FormData()

        data.append('name', name)
        data.append('email', email)
        data.append('password', password)

        if (password1 != password2) {
            alert('The passwords are different!')
        }

        else if (password1.length > 0) {
            api.get(`user/FindAll${email}`)
                .then(({ data }) => setUser(data))
                .catch(({ response }) => {
                    const { message, errors } = response.data

                    if (!message) {
                        console.log(response)
                        setEmail("")
                        setPassword1("")
                        setPassword2("")
                        return alert('Failed to fetch user data!')
                    }

                    console.error(errors)
                    alert(message)
                })
            if (!user) {
                api.post('user', data)
                    .then(() => {
                        alert('Registration Successful!')
                        push('/Login')
                    })
                    .catch(({ response }) => {
                        const { message, errors } = response.data

                        if (!message) {
                            console.log(response)
                            return alert('Failed to list registration data!')
                        }

                        console.error(errors)
                        alert(message)
                    })
            }
            else {
                alert('This email is already being used!')
            }
        }

    }
    return (

        <div className="LoginUp" onSubmit={handleSubmit}>
            <Form >
                <Form.Group className="box" controlId="nameLoginUp">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="box" controlId="emailLoginUp">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="box" controlId="passwordLoginUp">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password1}
                        onChange={event => setPassword1(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="box" controlId="passwordLoginUp">
                    <Form.Label>Confirm the Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password2}
                        onChange={event => setPassword2(event.target.value)}
                    />
                </Form.Group>
            </Form>

            <div className="PositionButtonLoginUp">
                <button className="LoginUpClick" type="submit" disabled={!validateForm()}>
                    Sign Up
                </button>

            </div>

        </div>

    );

}