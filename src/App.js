import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import Loader from "./components/Loader/Loader";
import Swal from "sweetalert2";
import EditPost from "./components/EditPost";

export const apiBaseUrl = `https://jsonplaceholder.typicode.com/posts`;

function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [editPostId , setEditPostId] = useState("");
  

  // useEffect(() => {
  //   getPost();
  // }, []);

  // const getPost = () => {
  //   setLoader(true);
  //   fetch(apiBaseUrl)
  //     .then((resolve) => resolve.json())
  //     .then((data) => {
  //       // console.log("data", data)
  //       setPost(data);
  //       setLoader(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoader(false);
  //     });
  // };
  // // getPost();

  // const deletePostyId = (postId) => {
  //   fetch(`${apiBaseUrl}/${postId}`, {
  //     method: "DELETE",
  //   })
  //     .then(() => {
  //       getPost();
  //       Swal.fire("post is deleted successfully", "", "error");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       Swal.fire("post is not deleted successfully", "", "error");
  //     });
  // };

  // const DeleteBtnHandler = (e, postId) => {
  //   e.preventDefault();
  //   Swal.fire({
  //     title: "Do you want to delete this post?",
  //     showDenyButton: true,
  //     confirmButtonText: "Yes",
  //     denyButtonText: `No`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deletePostyId(postId);
  //     }
  //   });
  // };

  // const EditBtnHandler = (e, postId) => {
  //   e.preventDefault();
  //   setEditPostId(postId);

  //   const $ = window.$;
  //   $("#edit-post").modal("show");
  // };

  const EditBtnHandler = (e,postId) => {
    e.preventDefault();
    setEditPostId(postId);

    const $ = window.$;
    $("#edit-post").modal("show");
  }

  const deletePostyId = (postId) => {
    fetch(`${apiBaseUrl}/${postId}`,{
      method : "DELETE",
    })
    .then(() => {
      getPost();
      Swal.fire("Post is deleted succussfully")
    })
    .catch((error) => {
     console.log(error,"error")
     Swal.fire("Post is not Deleted" , error)
    })
  }

  const DeleteBtnHandler = (postId) => {
    console.log(postId,"postId")
    Swal.fire({
          title: "Do you want to delete this post?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        }).then((result) => {
          if(result.isConfirmed){
            deletePostyId(postId)
          }
        })
  };

  useEffect(() => {
    getPost();
  }, [])

  const getPost = () => {
    setLoader(true)
    fetch(apiBaseUrl)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      setPosts(data)
      setLoader(false)
    })
    .catch((error) => {
      console.log(error,"error")
      setLoader(false)
    })
    
    // console.log(posts,"postData")
  }

  // getPost();
  return (
    <React.Fragment>
      <Loader loader={loader} />
      <div class="container">
        <h1>Posts</h1>
        <a class="btn btn-primary" data-toggle="modal" href="#create-post">
          Create Post
        </a>
        <CreatePost getPost={getPost} />
        <EditPost editPostId = {editPostId} getPost= {getPost} />
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Post Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="todos-listing">
            {posts.map((singlePost) => {
              return (
                <tr key={singlePost?.id}>
                  <td>{singlePost?.id}</td>
                  <td>{singlePost?.userId}</td>
                  <td>{singlePost?.title}</td>
                  <td>
                    <button
                      onClick={(e) => EditBtnHandler(e, singlePost?.id)}
                      className="btn btn-danger"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                     // onClick={(e) => DeleteBtnHandler(e, singlePost?.id)}
                      onClick={() => DeleteBtnHandler(singlePost?.id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
export default App;
