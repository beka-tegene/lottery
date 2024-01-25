import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../Image/logo.gif'
const Form = () => {
    const [fullName, setFullName] = useState()
    const [age, setAge] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [status, setStatus] = useState()
    const [invitedBy, setInvitedBy] = useState()
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/v1/lotto/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    age,
                    phoneNumber,
                    status,
                    invitedBy,
                }),
            });

            if (response.ok) {
                alert('User registered successfully!');
                window.location.reload(true)
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
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: "center", width: "100%" }}>DAN Energy Crowd Funding Form</h2>
                        <div style={{ width: "100%" }}>
                            <form action="" style={{ display: 'flex', flexDirection: 'column', gap: 8, }} onSubmit={submitHandler}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <label style={{ color: "#3E3232" }} htmlFor="fullname">Full Name</label>
                                    <input type="text" name="fullname" id="fullname" style={{
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px solid #272727",
                                        color: "#272727",
                                        outline: "none"
                                    }}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <label style={{ color: "#3E3232" }} htmlFor="age">Age</label>
                                    <input type="number" name="age" id="age" style={{
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px solid #272727",
                                        color: "#272727",
                                        outline: "none"
                                    }}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <label style={{ color: "#3E3232" }} htmlFor="status">Status</label>
                                    <select name="status" id="status" style={{
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px solid #272727",
                                        outline: "none"
                                    }}
                                        onChange={(e) => setStatus(e.target.value)}

                                    >
                                        <option disabled selected></option>
                                        <option value="Employee">Employee</option>
                                        <option value="Student">Student</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <label style={{ color: "#3E3232" }} htmlFor="invitation">Invited By</label>
                                    <input type="tel" name="invitation" id="invitation" style={{
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px solid #272727",
                                        color: "#272727",
                                        outline: "none"
                                    }}
                                        onChange={(e) => setInvitedBy(e.target.value)}

                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                                    <label style={{ color: "#3E3232" }} htmlFor="phonenumber">Phone Number</label>
                                    <input type="text" name="phonenumber" id="phonenumber" style={{
                                        padding: "10px 20px",
                                        borderRadius: "4px",
                                        width: "100%",
                                        background: "transparent",
                                        border: "1px solid #272727",
                                        color: "#272727",
                                        outline: "none"
                                    }}
                                        onChange={(e) => setPhoneNumber(e.target.value)}

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
                                    }}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Form