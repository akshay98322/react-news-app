import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, desc, imageUrl, url, author, date} = this.props;
    return (      
      <div>
        <div className="card"  style={{width: "18rem"}}>
          <img src={imageUrl?imageUrl:'https://static.toiimg.com/photo/90842559.cms'} className="card-img-top" alt='...'/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small classNmae="test-muted">By {author?author:"Unknown"} on {new Date(date).toUTCString}</small></p>
            <a rel="noreferrer" target="_blank" href={url} className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
