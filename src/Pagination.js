import React from 'react'

function Pagination({ postsPerPage, totalPosts }) {
  const pageNumbers = [];

  for ( let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>

    </div>
  )
}

export default Pagination