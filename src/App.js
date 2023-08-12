
import './App.css';
import React, { Component } from 'react';
import Navigation from './Navigation/Navigation';
// import ErrorBoundary from './ErrorBoundary';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarfai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/SignIn/Signin';
import BoundingBox from './components/FaceRecognition/BoundingBox';
import Register from './components/Register/Register';


  const initialState = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0, 
        joined : ''
      }

  }

  
class App extends Component {
  


  constructor() {
    super();
    this.state= initialState
  }

  
  onInputChange = (event) => {
    this.setState({input: event.target.value}); //Remember that simply passing "event" just logs that the event happened, event.target.value shows us what we're logging
  }
  // [{...}] <-- IN YOUR CONSOLE
  calculateFaceLocation = (region) => {  //Ran by ButtonSubmit
    const clarifaiFace = region.region_info.bounding_box;
    const image = document.getElementById('inputimage'); //because we want DOM manipulation to change the image div in FaceRecog
    const width = Number(image.width); // Because the output of the image 
    const height = Number(image.height);
    return {  //Object returned by this function, but we need to put this into something!
      leftCol: clarifaiFace.left_col * width, //because clarifaiFace.left_col is a PERCENTAGE
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

// Define a function called getAllFaces(data) that takes 
// in JSON data (from the clarafai API) as an argument and returns:
// - an empty array if there are no faces found

//     - the parameter 'response' contains 'data', and if data contains 0, then that means I can use data 
//     in my if else statement. 

// - if there are faces found, 
// return an array of <BoundingBox/> components with a box prop 
// that can be calculated using previously defined functions 
// (i.e calculateFaceLocation) and a key prop
//                 I think that this passes 'result' through the function because result is the response from the API
//                 taken as in JSON. 



getAllFaces = (data) => {
  console.log("getAllFaces:" + data);
  const regionArray = data.outputs[0].data.regions;
  if (regionArray.length === 0) {
    console.log('face box making error');
    return [];
    
  } else {
    const mappedArray = regionArray.map((region, i) => {
      const boundingBox = this.calculateFaceLocation(region); //this specifies the App... this
      return (
        <BoundingBox
          key={i}
          box={boundingBox} // corrected prop name to 'box'
        />
      );
    });
    return mappedArray; 
  }
};

// this.displayFaceBox(this.getAllFaces(data))
// this.displayFaceBox([<BoundingBox 1>, <BoundingBOx 2> ...]])
// state -> [<BoundingBox 1>, <BoundingBOx 2> ...]   !!!!!!
// 
// displayFaceBox = (box) => {
//   console.log(box);
//   this.setState({box: box});
// }
// <FaceRecognition box={this.state.box}/>
//////RENDERING




  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input});
    console.log("click");  
fetch('http://localhost:3000/imageurl' , {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({input : this.state.input})
  })
  .then(result => result.json())
  .then(result => { 
    console.log("promise:" + JSON.stringify(result))
    this.displayFaceBox(this.getAllFaces(result))
  })
  // .then(response => response.json())
  .then(() => {
      fetch('http://localhost:3000/image' , {
            
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
            })})})
  .then(console.log('image endpoint ran'))
  .then(() => {
        this.setState(Object.assign(this.state.user, {
          entries: Number(this.state.user.entries) + 1
        }))})
  .catch(error => console.log('error', error))
        //   const BoxData = result.outputs[0].data.regions[0].region_info.bounding_box;
    //   console.log(BoxData) })
    // .then(result => this.calculateFaceLocation(result))  
}


loadUser = (data) => {
  this.setState({user:  { //PAY ATTENTION TO SYNTAX 
    id: data.id,  //This comes from user param
    name: data.name,
    email: data.email, 
    entries: data.entries,
    joined: data.joined
  }})
}
// componentDidMount() {
//   fetch('http://localhost:3000/')
//   .then(response => response.json())
//   .then(console.log) // This is short hand for passing data through the next then function
// }


onRouteChange = (route) => {   
 this.setState({route: route}); //THIS ALWAYS GOES FIRST
 if (route === 'signout') {
      this.setState(initialState) 
  } if ( route === 'register') {
      this.setState({isSignedIn: false})
  }
  if ( route === 'signin') {
      this.setState({isSignedIn: false})

  }

  else if (route === 'home') 
        this.setState({isSignedIn: true})// Previously, you had onRouteChange set to 'home'. 
   // And it didn't pass anything through it. You needed to have set this state to the prop
}
   

  render () {
     const { isSignedIn, imageUrl, route, box } = this.state ;
     console.log('Current Route:', route)
     console.log('IsSignedIn?', isSignedIn)

    return (
      <div className= "App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' 
                ?<div> 
                  <Logo />
                  <Rank
                    name = {this.state.user.name}
                    entries = {this.state.user.entries}
                    

                  />
                  <ImageLinkForm 
                          onInputChange={this.onInputChange} 
                          onButtonSubmit={this.onButtonSubmit}/>  
                  <FaceRecognition box={box} imageUrl={imageUrl} /> 
                </div> 
        
                :   (
                    route === 'signin' 
                    ?<Signin 
                    onRouteChange = {this.onRouteChange}
                    loadUser={this.loadUser} />
                    : 
                    <Register 
                    loadUser= {this.loadUser}
                    onRouteChange={this.onRouteChange} />
                )
                
                }   
        </div>//We have to pass the box state through Face Recognition above ^
  )  //saving onInputChange and onButtonSubmit as props that you can use in ImageLinkForm!

        }
      }
export default App;



// 1. Next stuff will be hard, watch all videos
// 2. The project works. 
// 3. Clarifai API will be taught from base down, evolution from start to finish. 
// 4. GRPC. 




