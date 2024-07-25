import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";

export default function Login() {
    const { value, onChange, onSubmit } = useForm({
        email: '',
        password: '',
    }
        
    );

    return (
        <section id="login-page" className="auth">
        <form id="login" onSubmit={onSubmit}>

            <div className="container">
                <div className="brand-logo"></div>
                <h1>Login</h1>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Sokka@gmail.com"
                    onChange={onChange}
                    value={value.email} 
                />

                <label htmlFor="login-pass">Password:</label>
                <input 
                    type="password" 
                    id="login-password" 
                    name="password" 
                    onChange={onChange}
                    value={value.password}  
                />
                <input type="submit" className="btn submit" value="Login" />
                <p className="field">
                    <span>If you do not have profile click <Link to="/register">here</Link></span>
                </p>
            </div>
        </form>
    </section>
    )
}