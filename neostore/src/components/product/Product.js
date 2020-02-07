import React, { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';
import Pagination from './Pagination';
import axios from 'axios';

const Product = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [categoryName, setCategoryName] = useState('');


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      // switch(true) {
      //   case (props.categoryId!==null && props.colorId!==null): {
      //     const res = await axios.get(`http://180.149.241.208:3022/commonProducts?category_id=${props.categoryId}&color_id=${props.colorId}`);
      //     setPosts(res.data.product_details);
      //     setCategoryName(res.data.product_details[0].category_id.category_name)
      //     setLoading(false);
      //     break
      //   }
      //   case (props.categoryId!==null): {
      //     const res = await axios.get(`http://180.149.241.208:3022/commonProducts?category_id=${props.categoryId}`);
      //     setPosts(res.data.product_details);
      //     setCategoryName(res.data.product_details[0].category_id.category_name)
      //     setLoading(false);
      //     break
      //   }
      //   case (props.colorId!==null): {
      //     const res = await axios.get(`http://180.149.241.208:3022/commonProducts?color_id=${props.colorId}`);
      //     setPosts(res.data.product_details);
      //     setCategoryName(res.data.product_details[0].category_id.category_name)
      //     setLoading(false);
      //     break
      //   }
      //   default:{
      //     const res = await axios.get(`http://180.149.241.208:3022/commonProducts`);
      //     setPosts(res.data.product_details);
      //     setCategoryName("All Categories")
      //     setLoading(false);
      //   };
      // }
      try{
        if(props.categoryId!==null && props.colorId!==null ) {
          const res = await axios.get(`http://180.149.241.208:3022/commonProducts?category_id=${props.categoryId}&color_id=${props.colorId}`);
          setPosts(res.data.product_details);
          setLoading(false);
        }
      }
      catch(err) {
        return <h1>No Product found</h1>
      }
    };
    fetchPosts();
  }, [props.categoryId,props.colorId]);

  return (
    <div className='container'>
      {/* {console.log(props)} */}
      <div className="row">
        <div className="col-md-8 text-align-left">
          {(props.categoryId!==null || props.categoryId!==undefined)? <h3>{categoryName}</h3>:<h3>All Categories</h3>}
          {/* <h3>All Categories</h3> */}
        </div>
        <div className="col-md-4" style={{marginLeft:"auto"}}>
          Sort By:
          <i id="icon-blue" class="fas fa-star" ></i>
          <i id="icon-blue" class="fas fa-arrow-up" >&#8377;</i>
          <i id="icon-blue" class="fas fa-arrow-down" >&#8377;</i>
        </div>
      </div>
      
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