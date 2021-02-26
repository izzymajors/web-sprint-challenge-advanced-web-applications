import React from "react";
import axios from "axios";
import { render } from "@testing-library/react";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
    error: "",
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
      error: "",
    });
  };
  


  login = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:5000/api/login", this.state.credentials)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.payload));
      this.props.history.push("/protected");
    })
    .catch((err) => this.setStat({ err: err.response.data.error}));
  };

  // useEffect(()=>{
  //   axios
  //     .delete(`http://localhost:5000/api/colors/1`, {
  //       headers:{
  //         'authorization': "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98"
  //       }
  //     })
  //     .then(res=>{
  //       axios.get(`http://localhost:5000/api/colors`, {
  //         headers:{
  //           'authorization': ""
  //         }
  //       })
  //       .then(res=> {
  //         console.log(res);
  //       });
  //       console.log(res);
  //     })
  // });


  render(){
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <p style={{ color: `red`, fontSize: "12px" }}>{this.state.error}</p>
          <button>Log in</button>
        </form>
      </div>
    );
  }  
}
export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.