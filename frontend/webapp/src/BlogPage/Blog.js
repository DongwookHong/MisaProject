import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainFooter from "../Fix/MainFooter.js";
import MainHeader from "../Fix/MainHeader.js";
import ShareModal from "./ShareModal.js";
import Slide from "./BlogPhotoSlide.js";
import InfoPage from "./InfoPage";
import "../style/BlogPage/BlogPage.css";

const API_KEY = process.env.REACT_APP_API_KEY;

export async function blogLoader({ params }) {
  const { name } = params;
  try {
    const encodedName = encodeURIComponent(name);
    const response = await fetch(`/api/store/${encodedName}`, {
      headers: {
        accept: "*/*",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Response("Not Found", { status: 404 });
    }

    const data = await response.json();

    let images = [];
    if (data.storeImage) {
      const url = data.storeImage.startsWith("http")
        ? data.storeImage
        : `https://${data.storeImage}`;
      images = [url];
    } else if (Array.isArray(data.storeImages)) {
      images = data.storeImages
        .filter((url) => typeof url === "string")
        .map((url) => (url.startsWith("http") ? url : `https://${url}`));
    }

    return { ...data, images };
  } catch (error) {
    console.error("Error fetching store data:", error);
    throw new Response("Error loading store data", { status: 500 });
  }
}

function Blog() {
  const store = useLoaderData();
  const [showModal, setShowModal] = React.useState(false);
  const [shareData, setShareData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!store) {
      navigate("/404");
    }
  }, [store, navigate]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: store.storeName,
      text: `Check out this amazing place: ${store.storeInfo}`,
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setShareData(shareData);
        handleShowModal();
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (!store) {
    return null;
  }

  return (
    <>
      <MainHeader />
      <div className="blog-card">
        <InfoPage
          store_name={store.storeName}
          building_name={store.buildingName}
          building_dong={store.buildingDong}
          floor_number={store.floorNumber}
          storeHours={store.storeHours}
          store_number={store.storePhone}
          insta_path={store.instaPath}
          home_page_path={store.homePagePath}
          store_info={store.storeInfo}
          handleShare={handleShare}
        />

        {store.images.length > 0 && <Slide imageUrls={store.images} />}
        <ShareModal
          show={showModal}
          handleClose={handleCloseModal}
          shareData={shareData}
        />
      </div>
      <MainFooter />
    </>
  );
}

export default Blog;
