import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
// import CommentForm from '../films/CommentForm'
class FilmShow extends React.Component {
  state = { 
    film: null,
    newComment: {
      text: ''
    }
    // comments: []
  }
  async componentDidMount() {
    const filmId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/films/${filmId}`)
      this.setState({ film: res.data })
    } catch (err) {
      console.log(err)
      this.props.history.push('/notfound')
    }
  }
  handleDelete = async () => {
    const filmId = this.props.match.params.id
    try {
      await axios.delete(`/api/films/${filmId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/films')
    } catch (err) {
      console.log(err.response)
    }
  }
  // isOwner = () => Auth.getPayload().sub === this.state.film.user._id

  
  
  handleChangeC = e => {
    const newComment = { ...this.state.newComment, text: e.target.value }
    this.setState({ newComment })
    console.log(this.state.newComment)
  }
  handleSubmitC = async e => {
    // e.preventDefault()
    try {
      const res = await axios.post(`/api/films/${this.state.film._id}/comments`, this.state.newComment, {
        
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      // this.state.history.push(`/api/film/${res.data._id}`)
    } catch (err) {
      console.log(err.response)
    }
  }


  render() {
    const { film } = this.state
    if (!film) return null
    console.log(film)
    return (
      <section className="section">
        <div className="container">
          <h2 className="title">{film.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={film.image} alt={film.name} />
              </figure>
              <p>Created by: {film.user.username}</p>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Year</h4>
              <p>{film.year}</p>
              <hr />
              <h4 className="title is-4">Actor</h4>
              <hr />
              <p>{film.actor}</p>
              <hr />
              <h4 className="title is-4">Comments</h4>
              <hr />
              {film.comments.map(comment => <p key={comment._id}>{comment.user}: {comment.text}</p>)}
              <hr />
              {/* <CommentForm 
                newComment={this.state.newComment}
                handleChangeC={this.handleChangeC}
                handleSubmitC={this.handleSubmitC}
              /> */}
              <form onSubmit={this.handleSubmitC}>
                <input 
                  className="input"
                  placeholder="Add Comments Here"
                  name="comment"
                  onChange={this.handleChangeC}
                  value={this.newComment}
                />
                <button type="submit" className="button is-warning">Add a Comment</button>
              </form>
              
              <hr />
              {/* {this.isOwner() &&  */}
                <>
                 <Link to={`/films/${film._id}/edit`} className="button is-warning">Edit Film</Link>
                  <hr />
                  <button onClick={this.handleDelete} className="button is-danger">Delete Film ☠️</button>
                </>
                {/* } */}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default FilmShow