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
          setItems([...hits]);
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
