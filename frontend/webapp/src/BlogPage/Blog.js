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

function base64EncodeForAPI(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}

export async function blogLoader({ params }) {
  const { name } = params;
  try {
    const encodedName = base64EncodeForAPI(name);

    const storeResponse = await fetch(
      `https://apig.misarodeo.com/api/stores/${encodedName}`,
      {
        // const storeResponse = await fetch(`/api/stores/${encodedName}`, {
        headers: {
          accept: "*/*",
          "x-api-key": API_KEY,
        },
      }
    );

    if (!storeResponse.ok) {
      throw new Response("Store Not Found", { status: 404 });
    }

    const storeData = await storeResponse.json();

    let images = [];
    if (storeData.storeImage) {
      const url = storeData.storeImage.startsWith("http")
        ? storeData.storeImage
        : `https://${storeData.storeImage}`;
      images = [url];
    } else if (Array.isArray(storeData.storeImages)) {
      images = storeData.storeImages
        .filter((url) => typeof url === "string")
        .map((url) => (url.startsWith("http") ? url : `https://${url}`));
    }

    return {
      storeData: { ...storeData, images },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Error loading data", { status: 500 });
  }
}

function Blog() {
  const { storeData } = useLoaderData();
  const [showModal, setShowModal] = React.useState(false);
  const [shareData, setShareData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!storeData) {
      navigate("/404");
    } else {
      window.scrollTo(0, 0);
    }
  }, [storeData, navigate]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: storeData.storeName,
      text: `Check out this amazing place: ${storeData.storeInfo}`,
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

  if (!storeData) {
    return null;
  }

  return (
    <>
      <MainHeader />
      <div className="blog-card">
        <InfoPage
          store_name={storeData.storeName}
          building_name={storeData.buildingName}
          building_dong={storeData.buildingDong}
          floor_number={storeData.floorNumber}
          storeHours={storeData.storeHours}
          store_number={storeData.storePhone}
          insta_path={storeData.instaPath}
          home_page_path={storeData.homePagePath}
          store_info={storeData.storeInfo}
          handleShare={handleShare}
          floor_image={storeData.floorImage}
          block_id={storeData.blockId}
        />

        {storeData.images.length > 0 && <Slide imageUrls={storeData.images} />}
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
