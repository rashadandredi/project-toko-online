import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders : [],
            id: "",
            id_user: "",
            id_alm: "",
            total: "",
            bukti_bayar: null,
            status: "dipesan",
        }
        // jika tidak terdapat data token pada lokal storage
        if(!localStorage.getItem("Token")){
            // direct ke halaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data

    get_orders = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/orders";
        axios.get(url)
        .then(response => {
            this.setState({orders: response.data.orders});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }

    Accept = (id) => {
      if(window.confirm("APakah anda yakin mengkonfirmasi order ini?")){
        let url = "http://localhost/toko_online/public/order/accept/"+id;
        axios.get(url)
        .then(response => {
          this.get_orders();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    Decline = (id) => {
      if(window.confirm("APakah anda yakin mengkonfirmasi order ini?")){
        let url = "http://localhost/toko_online/public/order/decline/"+id;
        axios.get(url)
        .then(response => {
          this.get_orders();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/products/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_products();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
      this.get_orders();

    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_products").modal("hide");
        let url = "http://localhost/toko_online/public/products/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("stock", this.state.stock);
        form.append("price",this.state.price);
        form.append("description", this.state.description);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_products();
        })
        .catch(error => {
            console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13 ){
            // $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/products";
            let form = new FormData();
            form.append("find",this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({products: response.data.products});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Request Orders</h4>
                            </div>
                            =
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin faspinner"></span> Sedang Memuat
        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID Alamat</th>
                                    <th>ID User</th>
                                    <th>Total</th>
                                    <th>Bukti Bayar</th>
                                    <th>Status</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.orders.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_alm}</td>
                                            <td>{item.id_user}</td>
                                            <td>{item.total}</td>
                                            <td>{item.bukti_bayar}</td>
                                            <td>{item.status}</td>
                                            <td>{item.description}
                                              <Link className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Accept(item.id_order)}>
                                              Terima
                                              </Link>
                                              <Link className="m-1 btn btn-sm btn-outline-danger"
                                              onClick={() => this.Decline(item.id_order)}>
                                              Tolak
                                              </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        );
    }
}
export default Orders
