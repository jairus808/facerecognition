import React from 'react';


class Register extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '',
      name: ''
    }
  }

  //Made these functions before adding to our component
  onNameChange = (event) => {
    this.setState({name:  event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({email : event.target.value })

  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
 
  onSubmitSignIn = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name 
      })
    }).then(response => response.json()) 
    .then(user => { 
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home') 
        console.log('user loaded!') //create another function that updates user that passes our user thru it!
              }        //we probably want to specify this function in App.js
      else {
        console.log('user is not loading')
      }
      }
    )
    }




   render() {
    return (
        <article class="br3 shadow-5 ba b--black-10 mv4 w-10 w-50-m w-25-l mw6 center"> 
       <main className="pa4 black-80">
  <form className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" for="email-address">Name</label>
        <input 
        onChange = {this.onNameChange}
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="email-address"  
        id="name"/>
      </div>

      <div className="mt3">
        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
        <input 
        onChange = {this.onEmailChange}
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" for="password">Password</label>
        <input 
        onChange = {this.onPasswordChange}
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password"/>
      </div>
      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
    </fieldset>
    <div className="">
      <input 
      onClick = {this.onSubmitSignIn}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
       type="submit" 
       value="Register"/>
    </div>
  </form>
</main>
        
    </article>

    )

}
}
export default Register;     
