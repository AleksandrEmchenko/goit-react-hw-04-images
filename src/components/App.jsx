import React, { useState } from "react";
import css from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import { searchFunc } from "./Services/API";
import Loader from "./Loader";

let page = 1;
export function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [totalHits, setTotalHits] = useState(0);

  const handleFormSubmit = async (query) => {
    page = 1;

    if (query.trim() === "") {
      return toast.warn("Enter a search term!!!");
    } else {
      try {
        setStatus("pendind");
        const { totalHits, hits } = await searchFunc(query, page);
        
        if (hits.length < 1) {
          setStatus("idle");
        } else {
          setItems(hits);
          setQuery(query);
          setTotalHits(totalHits);
          setStatus("resolved");
        }
      } catch (error) {
        setStatus("rejected");
        return toast.error("Something went wrong, please try again later");
      }
    }
  };

  const onNextPage = async () => {
    setStatus("pendind");

    try {
      const { hits } = await searchFunc(query, (page += 1));
      setStatus("resolved");
      
      setItems([...items, ...hits]);
    } catch (error) {
      setStatus("rejected");
      return toast.warn(
        "There are no images matching your request. Please try again."
      );
    }
  };

  if (status === "idle") {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery page={page} items={items} />
        <Loader />
        {totalHits > 12 && <Button onClick={onNextPage} />}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
  if (status === "resolved") {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery page={page} items={items} />
        {totalHits > 100 && totalHits > items.length && (
          <Button onClick={onNextPage} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

// import React from "react";
// import css from "./App.module.css";
// import { ToastContainer, toast } from "react-toastify";
// import Searchbar from "./Searchbar";
// import ImageGallery from "./ImageGallery";
// import Button from "./Button";
// import { searchFunc } from "./Services/API";
// import Loader from "./Loader";

// let page = 1;
// export class App extends React.Component {
//   state = {
//     query: "",
//     items: [],
//     status: "idle",
//     totalHith: 0,
//   };

//   handleFormSubmit = async (query) => {
//     page = 1;
//     if (query.trim() === "") {
//       return toast.warn("Enter a search term!!!");
//     } else {
//       try {
//         this.setState({ status: "pending" });
//         const { totalHits, hits } = await searchFunc(query, page);
//         if (hits.length < 1) {
//           this.setState({ status: "idle" });
//           // return toast.warn(
//           //   "There are no images matching your request. Please try again."
//           // );
//           // alert("There are no images matching your request. Please try again.");
//         } else {
//           this.setState({
//             items: hits,
//             query,
//             totalHits: totalHits,
//             status: "resolved",
//           });
//         }
//       } catch (error) {
//         this.setState({ status: "rejected" });
//         return toast.error("Something went wrong, please try again later");
//         // alert("Something went wrong, please try again later");
//       }
//     }
//   };

//   onNextPage = async () => {
//     this.setState({ status: "pending" });

//     try {
//       const { hits } = await searchFunc(this.state.query, (page += 1));
//       this.setState((prevState) => ({
//         status: "resolved",
//         items: [...prevState.items, ...hits],
//       }));
//     } catch (error) {
//       this.setState({ status: "rejected" });
//       return toast.warn(
//         "There are no images matching your request. Please try again."
//       );

//     }
//   };

//   render() {
//     const { totalHits, items, status } = this.state;
//     if (status === "idle") {
//       return (
//         <div className={css.App}>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <span>Enter a search term!!!</span>
//           <ToastContainer autoClose={2000} />
//         </div>
//       );
//     }
//     if (status === "pending") {
//       return (
//         <div className={css.App}>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ImageGallery page={page} items={this.state.items} />
//           <Loader />
//           {totalHits > 12 && <Button onClick={this.onNextPage} />}
//           <ToastContainer autoClose={2000} />
//         </div>
//       );
//     }
//     if (status === "rejected") {
//       return (
//         <div className={css.App}>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ToastContainer autoClose={2000} />
//         </div>
//       );
//     }
//     if (status === "resolved") {
//       return (
//         <div className={css.App}>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <ImageGallery page={page} items={this.state.items} />
//           {totalHits > 100 && totalHits > items.length && (
//             <Button onClick={this.onNextPage} />
//           )}
//           <ToastContainer autoClose={2000} />
//         </div>
//       );
//     }
//   }
// }
