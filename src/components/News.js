import React, {useEffect, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";


export default function News(props) {
  // useState 
  const [articles, setArticles] = useState ([]);
  const [page, setPage] = useState (1);
  const [totalRes, setTotalRes] = useState (0);
  const [loading, setLoading] = useState (true);

  const updateNews = async () => {
    // props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=869e2323f75241ee848548da3ee028fd&page=${page}&pageSize=${props.pageSize}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    setArticles(data.articles)
    setLoading(false);
    // props.setProgress(50);
    setTotalRes(data.totalResults);
    // props.setProgress(100);
  }
  useEffect(() => { updateNews(); }, [])

  const fetchMoreData = async () => {
    setPage(page + 1);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=869e2323f75241ee848548da3ee028fd&page=${page}&pageSize=${props.pageSize}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    setArticles(articles.concat(data.articles))
    setTotalRes(data.totalResults);
  }

    return (
      <>
        <div className="container">
          <h2 className="text-center my-3">News Items</h2>
        </div>
        {loading && <Spinner />}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalRes}
            loader={<Spinner />}
          >
            
        <div className="container">
          <div className="row">
            {articles.map((element) => {
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
    )
  }




  // PropTpyes Example
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  // Default Props Example
  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  }

