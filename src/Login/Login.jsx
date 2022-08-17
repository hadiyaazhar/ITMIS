import React from "react";
import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import Sidebar from "../Components/Sidebar/Sidebar";
import swal from 'sweetalert';

const API_URL = "http://103.226.217.67:443/api/org/fetch-list";
const LOGIN_AP = "http://103.226.217.67:443/api/auth/signin";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState(1);
  const [value, setValue] = useState([]);
  const [login,setLogin]=useState(false)
  const getData = async () => {
    axios.get(API_URL)
    .then((res)=>{
      setValue(res.data.data);
      
    })
    .catch((err)=>{console.log(err)})
  };

  useEffect(() => {
    getData();

  }, []);


  const handleClickSignIn = (e) => {
    e.preventDefault();

   if(email==='' || password ===''|| orgId==='0')
   {
    alert("Please fill all fields")
   }
   else
   {

     axios
     .post(LOGIN_AP, {
       UserName: email,
       UserPass: password,
        OrgId: orgId,
      })
      .then((res) => {
      
        var encrypt = res.data.data;
        // console.log(login)
        if(res.data)
        {
          setLogin(true);
          console.log(login)
        }
        Object.keys(encrypt).map((key) => {
          
          var CryptoJS = require("crypto-js");
          
          var data =encrypt[key]
          
          // Encrypt
          var ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            "secret key 123"
          ).toString();
          sessionStorage.setItem(key ,ciphertext)




          // Decrypt
          var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
          var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          swal({
            title: "Logged In successfully",
            icon: "success",
            button: "Ok",
          });
          
          // console.log(key+" -->  Encrypted Data --> " + ciphertext+"\n Decrypted Data -->"+decryptedData);
          navigate('/dashboard')
        });
        // console.log(sessionStorage.getItem(decryptedData));
        
        return encrypt
      })
      .catch((err) => {console.log(err)
      
      alert('Incorrect Data')});
    }
    };
  return (
      <Sidebar login={login}>
    <div className="container">

      <div className="login">
        <img
          src="https://theartstudio.pk/wp-content/uploads/2020/11/ORAGELINE-METROTRAIN-THUMBNAIL.jpg"
          className="train-img"
          alt=""
        />
        <h1 className="login-heading">ITMIS</h1>
        <p className="login-paragraph">Login to your account.</p>
        <div className="login-form">
          <form action="" className="login-form">
            <div className="serice-div">
              <label className="login-label">
                Service Provider<span style={{ color: "red" }}>*</span>
              </label>
              <select name="service" className="form-box" value={orgId} onChange={((e)=>{setOrgId(e.target.value)})} >
                {
                value.map((item) => (
                  <option value={item.id}>{item.name} </option>
                ))}
              </select>
            </div>

            <div className="email-div">
              <label className="login-label">
                Usercode/Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Usercode / Enter Email"
                className="form-box"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="password-div">
              <label className="login-label">
                Password<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-box"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              className="login-signin"
              onClick={(e) => {
                handleClickSignIn(e);
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

    </div>
      </Sidebar>
  );
};

export default Login;
