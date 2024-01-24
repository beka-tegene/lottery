import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../Image/logo.gif'
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            axios.defaults.withCredentials = true;
            const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                alert('User registered successfully!');
                console.log(response)
                // window.location.href = '/random'
            } else {
                alert('Failed to register user:', response.statusText);
            }
        } catch (error) {
            alert('Error during form submission:', error);
        }
    };
    return (
        <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg , #503C3C 50%, #3E3232 50%)" }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    textAlign: "center", width: '400px',
                    borderRadius: '4px', background: "#F1F2ED", padding: 16,
                }}
            >
                <img src={logo} alt="logo" style={{ width: "100px" }} />
                <div
                    style={{

                        color: '#272727',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: "flex-start", width: "100%" }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: "center", width: "100%" }}>Login</h2>
                        <div style={{ width: "100%" }}>
                            <form action="" style={{ display: 'flex', flexDirection: 'column', gap: 8, }} onSubmit={submitHandler}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <label style={{ color: "#3E3232" }} htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" style={{
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px solid #272727",
                                        color: "#272727",
                                        outline: "none"
                                    }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <label style={{ color: "#3E3232" }} htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" style={{
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px solid #272727",
                                        color: "#272727",
                                        outline: "none"
                                    }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <button type="submit" style={{
                                        cursor: 'pointer',
                                        padding: '.5rem 1rem',
                                        background: '#8758ff',
                                        border: '1px solid #8758ff',
                                        borderRadius: '4px',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: '#FFFFFF',
                                        width: "100%"
                                    }}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login