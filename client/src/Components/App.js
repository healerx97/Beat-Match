import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
//importing Components
import NavBar from './NavBar';
import Matches from './Matches';
import Swipe from './Swipe';
import Login from './Login';
import Profile from './Profile';
import Feed from './Feed';

//importing react modules
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null)
  const [swipeUsers, setSwipeUsers] = useState([])
  const [tags, setTags] = useState([])
  const [tracks, setTracks] = useState([])
  const [errors, setErrors] = useState([])
  const [tracksChecker, setTracksChecker] = useState(false)
  let history = useHistory()

  console.log(user)

  function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/me")
      if (res.ok) {
        const json = await res.json()
        setUser(json)
        history.push("/")
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    async function getTracks() {
        const res = await fetch("/tracks")
        if (res.ok) {
          const tracksData = await res.json()
          setTracks(tracksData)
        }
    }
    getTracks()
  }, [tracksChecker, user]) // tracksChecker and user? in dep array

  useEffect(() => {
    async function getSwipeUsers() {
      const res = await fetch("/users")
      if (res.ok) {
        const json = await res.json()
        let array = shuffle(json)
        setSwipeUsers(array)
      }
    }
    getSwipeUsers()
  }, [user])

  useEffect(() => {
    async function getTags() {
      const res = await fetch("/tags")
      if (res.ok) {
        const json = await res.json()
        setTags(json)
      }
    }
    getTags()
  }, [tracksChecker, user]) // tracksChecker and user? in dep array

  async function logOut() {
    const res = await fetch("/logout", {
      method: "DELETE"
    })
    if (res.ok) {
      setUser(null)
      setSwipeUsers([])
      setTags([])
      setTracks([])
      setErrors([])
      history.push("/login")
    }
  }

  async function handleDeleteTrack(e) {
    console.log(e.target.id)
    let song_id = e.target.id
    const res = await fetch(`/tracks/${song_id}`, {
      method: "DELETE"
    })
    if (res.ok) {
      let remainingTracks = tracks.filter(track => track.id != song_id)
      setTracks(remainingTracks)
    }
  }

  async function handleUserUpdate(updatedUser) {
    console.log(updatedUser)
    const res = await fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(updatedUser)
    })
    const data = await res.json()
    if (res.ok) {
      setUser(data)
      history.push("/")
    } else {
      setErrors(data.errors)
    }
  }

  function handleUserDelete(e) {
    e.preventDefault()
    fetch(`/users/${user.id}`, {
      method: "DELETE",
    })
    .then(() => logOut())
  }

  function handleTrackAdd() {
    setTracksChecker(!tracksChecker)
  }

  console.log(tracks)
  console.log(tags)

  return (
    <div className="App">
      {user ?
      <NavBar user={user} logOut={logOut} setErrors={setErrors} />
      : null}

      <Switch>
        <Route exact path = "/matches">
          {user ? <Matches user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route exact path = "/profile">
          {user ? <Profile user={user} tags={tags} tracks={tracks} handleTrackAdd={handleTrackAdd} handleDeleteTrack={handleDeleteTrack} handleUserUpdate={handleUserUpdate} handleUserDelete={handleUserDelete} errors={errors}/> : <Redirect to="/login" />}
        </Route>
        <Route exact path = "/login">
          <Login onLogin={setUser}/>
        </Route> 
        <Route exact path = "/">
          {user ? <Swipe tracks={tracks} swipeUsers={swipeUsers} setSwipeUsers={setSwipeUsers}/> : <Redirect to="/login" />}
         </Route>
        <Route exact path = "/feed">
          {user ? <Feed tracks={tracks} tags={tags}/> : <Redirect to="/login" />}
         </Route>
      </Switch>
    </div>
  );
}

export default App;
