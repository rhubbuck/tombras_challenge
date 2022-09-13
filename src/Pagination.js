import React from 'react'

function Pagination({ currentPage, setCurrentPage, postsPerPage, totalPosts }) {



  function setNextPage() {
    console.log(totalPosts)
    if (currentPage < (Math.ceil(totalPosts / postsPerPage))) {
      setCurrentPage(currentPage + 1);
    } else {
      return;
    }
  }

  function setPrevPage() {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    } else {
      return;
    }
  }

  function setFirstPage() {
    setCurrentPage(1);
  }

  function setLastPage() {
    setCurrentPage(Math.ceil(totalPosts / postsPerPage));
  }
 
  return (
    <div className='fixed bottom-8 right-20'>
          <button onClick={setFirstPage} className='bg-orange-100 p-4 border-r-2 border-black'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
            </svg>
          </button>
          <button onClick={setPrevPage} className='bg-orange-100 p-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </button>
          <button onClick={setNextPage} className='bg-orange-100 p-4 border-l-2 border-black'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          <button onClick={setLastPage} className='bg-orange-100 p-4 border-l-2 border-black'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
          {/* <nav>
            <ul>
              {pageNumbers.map(number => {
                <li key={number}>
                  <a href='!#'>
                    {number}
                  </a>
                </li>
              })}
            </ul>
          </nav> */}
        </div>
  )
}

export default Pagination