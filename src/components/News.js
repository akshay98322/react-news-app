import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  // Default Props
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  // Prop Types
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  // The Constructor
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalRes: 0,
      loading: true,
    };
  }
  async updateNews() {
    this.props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      loading: false,
      totalRes: data.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }
  
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalRes: data.totalResults,
    });

  };
  render() {
    return (
      <>
        <div className="container">
        <h2 className="text-center my-3">News Items</h2>
        </div>          
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalRes}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div key={element.url} className="col-md-4 my-2">
                      <NewsItem
                        title={element.title}
                        desc={element.description}
                        imageUrl={element.urlToImage}
                        url={element.url}
                        author={element.author}
                        date={element.publisedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>


        
      </>
    );
  }
}
