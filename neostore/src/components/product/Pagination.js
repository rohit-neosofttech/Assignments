import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{padding:'30px 0px'}}>
      <ul className='pagination justify-content-center'>
        <li class="page-item">
            <a class="page-link" href="?" tabindex="-1">{'<<<'}</a>
        </li>
        {pageNumbers.map(number => (
            <li key={number} className='page-item' >
                <a onClick={(e) => {
                    paginate(number)
                    e.preventDefault()
                    } } href='?' className='page-link' >
                    {number} 
                </a>
            </li>
        ))}
        <li class="page-item">
                <a class="page-link" href="?">{'>>>'}</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;