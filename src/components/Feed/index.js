import React from "react";
import {
  FaRegCommentAlt,
  FaSyncAlt,
  FaRegArrowAltCircleUp
} from "react-icons/fa";
import ErrorBoundary from "../ErrorBoundary";
import {
  list,
  listItem,
  itemContent,
  itemSubtitle,
  itemLink
} from "./Feed.module.css";
import Center from "../Center";
import Title from "../Title";
import Row from "../Row";
import LoadingSpinner from "../LoadingSpinner";

export default function Feed({ items, title, onRefresh, onLoadMore, loading }) {
  return (
    <>
      <Row>
        <Title>
          <h2>{title}</h2>
        </Title>
        <button onClick={onRefresh} className="header__action" title="Refresh">
          <FaSyncAlt />
        </button>
      </Row>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ErrorBoundary>
          <ul className={list}>
            {items.map(
              ({
                link,
                title,
                points,
                responseCount,
                id,
                author,
                description
              }) => (
                <li className={listItem} key={id}>
                  <div className={itemContent}>
                    <a href={link} className={itemLink} title="Title">
                      {title} {description && `— ${description}`}
                    </a>
                    <div>
                      <span title="Author" className={itemSubtitle}>
                        {author}
                      </span>
                      {points != null && (
                        <>
                          <span> • </span>
                          <span className={itemSubtitle} title="Points">
                            {points} <FaRegArrowAltCircleUp />
                          </span>
                        </>
                      )}
                      {responseCount != null && (
                        <>
                          <span> • </span>
                          <span className={itemSubtitle} title="Responses">
                            {responseCount} <FaRegCommentAlt />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
          {onLoadMore && (
            <Center>
              <button onClick={onLoadMore}>Load more</button>
            </Center>
          )}
        </ErrorBoundary>
      )}
    </>
  );
}
