import React,{Component} from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from 'react-router-dom';
// import Form from "../components/Form/";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            role: "",
            message: "",
        }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost/toko_online/public/user/auth";
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);

        axios.post(url,form)
        .then(response => {
            let logged = response.data.status;
            if (logged) {
                let role = localStorage.getItem("role")
                { role === "admin" ? window.location = "/product" : window.location = "/products" }
                this.setState({message: "Login Berhasil"});
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("role", JSON.stringify(response.data.role));
                localStorage.setItem("id_user", JSON.stringify(response.data.user.id_user));
            } else {
                this.setState({message: "Login Gagal"});
            }
            $("$message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return (
            <div className="container" style={{width:"50%"}}>
                <div className="card my-2">

                    <div className="card-header bg-success">
                        <h5 className="text-white">Login</h5>
                    </div>
                    <div className="card-body">
                        <Toast id="message" autohide="false" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <form onSubmit={this.Login}>

                            <input type="email" className="form-control m-1" name="email" value={this.state.email} onChange={this.bind} required placeholder="Masukkan email" />
                            <input type="password" className="form-control m-1" name="password" value={this.state.password} onChange={this.bind} required placeholder="Masukkan Password"/>
                            <button className="mt-2 btn btn-block btn-info" type="submit">
                                <span className="fa fa-sign-in"></span>Login
                            </button>
                        </form>
                        <div>
                        <p></p>
                        Belum punya akun?
                        <Link to="/Register">
                        <button className="mt-2 btn btn-block btn-secondary" type="submit">
                        <span className=""></span>Buat Akun Baru
                        </button>
                        </Link>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}
