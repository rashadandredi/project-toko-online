import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      email: "",
      role: "",
      image: "",
      full_name: "",
      jenis_kelamin: "",
      tanggal_lahir: "",
      nohp: "",
      action: "",
      find: "",
      message: ""
    }
  }

    // jika tidak terdapat data token pada local storage
  //   if(!localStorage.getItem("Token")){
  //     // direct ke halaman login
  //     window.location = "/login";
  //   }
  // }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }

    Add = () => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id_user: "",
        nama_user:"",
        email: "",
        password: "",
        role: "",
        image: null
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_user: item.id_user,
        nama_user: item.nama_user,
        email: item.email,
        password: item.password,
        role: item.role,
        image: item.image,
        full_name: item.full_name,
        jenis_kelamin: item.jenis_kelamin,
        tanggal_lahir: item.tanggal_lahir,
        nohp: item.nohp
      });
    }

    get_user = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/toko_online/public/user";
      axios.get(url)
      .then(response => {
        this.setState({user: response.data.user});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/user/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_user();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_user();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");
      let url = "http://localhost/toko_online/public/user/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_user", this.state.id_user);
      form.append("nama_user", this.state.nama_user);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      form.append("image", this.state.image, this.state.image.name);
      form.append("full_name", this.state.full_name);
      form.append("jenis_kelamin", this.state.jenis_kelamin);
      form.append("tanggal_lahir", this.state.tanggal_lahir);
      form.append("nohp", this.state.nohp);
      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_user();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/user";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({user: response.data.user});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      return(
        <div className="container">
          <div className="mt-4">
            {/* header card */}
            <div className="#">
              <div className="row">
                <div className="col">
                  <h4 className="#" style={{fontWeight:"600", textAlign:"center", fontSize:"35px"}} >Data User</h4>
                </div>
              </div>
              <div className="col-sm-3">
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div>

            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              {/* <Toast id="loading" autohide="false" title="Informasi"> */}
                {/* <span className="fa fa-spin fa-spinner"></span> Sedang Memuat */}
              {/* </Toast> */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Gambar</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.user.map((item) => {
                    return(
                      <tr key={item.id_user}>
                        <td>{item.nama_user}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.role}</td>
                        <td><img src={'http://localhost/toko_online/public/images/' + item.image}
                               alt={item.image} width="200px" height="200px"/></td>
                        <td>
                          <button className="m-1 btn btn-sm btn-outline-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id_user)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}

              <button className="btn btn-success my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>


              {/* form modal siswa*/}
              <Modal id="modal_user" title="Form User" bg_header="success" text_header="white">
                <form onSubmit={this.Save}>
                Nama
                  <input type="text" className="form-control" name="nama_user"
                    value={this.state.nama_user} onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="email"
                    value={this.state.email} onChange={this.bind} required />
                  Password
                  <input type="text" className="form-control" name="password"
                    value={this.state.password} onChange={this.bind} required />
                  Role
                  <input type="text" className="form-control" name="role"
                    value={this.state.role} onChange={this.bind} required />
                  Gambar
                      <input type="file" className="file-control" name="image"
                        onChange={this.bindImage} required />
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
}
export default User;
