
import { NavLink } from 'react-router-dom'


// const { useState } = React

export function LoginSignup() {



    return (
        <section className="header-login">
                <div className="sign-up"> <NavLink to="/signup" >sign up</NavLink></div>
                <div className="login"><NavLink to="/login" >login</NavLink></div>
           
            {/* <LoginForm isSignup={isSignup}/> */}
           
        </section >
    )
}

