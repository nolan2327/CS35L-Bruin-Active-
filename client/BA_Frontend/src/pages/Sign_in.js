import React from 'react'

const SignIn = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div style={tileStyle}>
                <h2 style={titleStyle}>Sign In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    style={inputStyle}
                />
                <div style={{ margin: '10px 0' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        style={inputStyle}
                    />
                </div>
                <h4 style={titleStyle}>New to Bruin Active?</h4>
                <button style={buttonStyle}>Create a Profile</button>
                <button style={SiButtonStyle}>Sign In</button>
            </div>
        </div>
    );
};

const tileStyle = {
    backgroundColor: '#008fdc',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '350px',
};

const titleStyle = {
    marginBottom: '10px',
    color: '#fff',
};

const inputStyle = {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    width: '100px',
    padding: '10px',
    fontSize: '10px',
    marginBottom: '30px',
    color: '#008fdc',
    border: '1px solid #ccc',
    borderRadius: '2px',
};

const SiButtonStyle = {
    width: '300px',
    padding: '10px',
    fontSize: '24px',
    backgroundColor: '#fff',
    color: '#008fdc',
    border: '1px solid #ccc',
    borderRadius: '2px',
};

export default SignIn;