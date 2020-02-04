import React, { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';
import Pagination from './Pagination';
import axios from 'axios';

const Product = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`http://180.149.241.208:3022/commonProducts`);
      setPosts(res.data.product_details);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className='container'>
      <h3>All Categories</h3>
      <div className="row">
        <ProductsCard products={currentPosts} loading={loading} />
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Product;