import './App.css';
import {useState} from "react";
import logo from "./images/logo.png"
import {Link, useHistory} from "react-router-dom";
import axios, {Axios} from "axios";

function App() {

    const [form, setForm] = useState({
        user: '',
        password: ''
    });

    const history = useHistory();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const {user, password} = form;
        //Validaciones
        if (user === "") return;
        if (password === "") return;
        const response = await axios.post('http://localhost:8080/api/user/authenticate', {
            email: user,
            password: password
        })
        if (response.status === 200){
            history.push("/")
            localStorage.setItem('login', response.data.id)
        }
        console.log("Unauthorized");
    }

    return (
        <>
            <div className={"flex-row content"}>
                <div className={"login-logo flex"}>
                    <img src={logo} height={425}/>
                </div>
                <div className={"login-form relative flex-center flex-grow"}>
                    <form className={"flex-column flex-center flex-grow"} onSubmit={onFormSubmit}>
                        <div className={"flex-column login flex-center flex-grow"}>
                            <h2>WIVETY</h2>
                            <div className={"separator"}>Iniciar sesión</div>
                            <div className={"flex-column login__fields"}>
                                <label>Usuario</label>
                                <input className={"fields__input"} onChange={(e) => {
                                    setForm({...form, user: e.target.value})
                                }} type={"text"}/>
                            </div>
                            <div className={"flex-column login__fields"}>
                                <label>Password</label>
                                <input type={"password"} className={"fields__input"} onChange={(e) => {
                                    setForm({...form, password: e.target.value})
                                }}/>
                            </div>
                            <div className={"flex-column login__submit"}>
                                <button type={"submit"}>Inciar sesion</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default App;
