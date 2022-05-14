import React, { FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom"
import "../styles/conponents/recover.css";
import api from "../services/api"

interface User {
    id: number,
    email: string,
    password: string,
}

const Recover: React.FC = () => {

    const [user, setUser] = useState<User>()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { push } = useHistory()

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = new FormData()

        data.append('email', email)
        data.append('password', password)

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

        }
        else if ((email == user.email)) {
            api.put(`user${user.id}`, data)
                .then(() => {
                    alert('Password has been changed successfully!')
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
            alert('An error has occurred. Try again!')
        }



    }
    return (
        <div id="Login-page">
            <main>
                <form className="Login-user-form" >

                    <legend className="Dados">Recover Password</legend>

                    <div className="Login" onSubmit={handleSubmit}>
                        <Form>
                            <Form.Group className="box" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="box" controlId="password">
                                <Form.Label>New password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Form.Group>
                            <button className="Login" type="submit" disabled={!validateForm()}>
                                To save
                            </button>
                        </Form>

                    </div>


                </form>

            </main>

        </div>

    );

}

export default Recover