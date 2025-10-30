"use client";

import { useEffect, useState } from "react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { storage } from "@/firebase/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadBlog } from "./BlogUpload";
import { useLoading } from "@/hook/hooks";
import IosToggleSwitch from "@/components/IosToggleSwitch";
import FroalaEditorComponent from "@/components/FroalaEditorComponent";
import SpinningLoading from "@/components/SpinningLoading";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Card wrapper with 3D effect
// Card wrapper with stronger 3D effect
const Card = ({ children, className = "" }) => (
  <div
    className={`
      bg-gray-300 
      rounded-xl 
      p-4 
      shadow-xl shadow-gray-400/30 
      transition-transform duration-300 
      hover:scale-95
      hover:shadow-2xl hover:shadow-gray-500/40
      ${className}
    `}
  >
    {children}
  </div>
);

// Controlled input field
const InputField = ({ label, name, value, onChange, placeholder }) => (
  <Card>
    <span className="text-gray-600 font-medium mb-2 block">{label}</span>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-400 outline-none"
    />
  </Card>
);

// Controlled textarea field
const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <Card className="col-span-2">
    <span className="text-gray-600 font-medium mb-2 block">{label}</span>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-400 outline-none resize-none"
    />
  </Card>
);

const Page = () => {
  const [Form, setForm] = useState({
    HeroParag: "",
    HeroTitle: "",
    HeaderTitle: "",
    HeaderAuthor: "",
    HeaderPublishedDate: "",
    Headerdescribtion: "",
    HeroImgUrl: "",
    HeaderImgUrl: "",
  });
  const [QAs, setQAs] = useState([]);
  const [Links, setLinks] = useState([]);
  const [Url, setUrl] = useState({ address: "" });
  const [QAformData, setQAFormData] = useState({ question: "", answer: "" });
  const [loading, withLoading] = useLoading();
  const [HeroImage, setHeroImage] = useState(null);
  const [HeaderImage, setHeaderImage] = useState(null);
  const [UrlTitle, setUrlTitle] = useState("");
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  function shortenString(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + "...";
  }

  const showFailureToast = (error) =>
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressClassName: "custom-progress-bar-error",
      toastClassName: "custom-toast-error",
    });

  const showSuccessToast = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressClassName: "custom-progress-bar-error",
      toastClassName: "custom-toast-error",
    });

  const showInfoToast = (msg) =>
    toast.info(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressClassName: "custom-progress-bar-error",
      toastClassName: "custom-toast-error",
    });

  useEffect(() => {
    if (isToggleOn) showInfoToast("!! زبان به فارسی تبدیل شد");
  }, [isToggleOn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQAChange = (e) => {
    const { name, value } = e.target;
    setQAFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setUrl((prev) => ({ ...prev, [name]: value }));
  };

  const handleQASubmit = (e) => {
    e.preventDefault();
    if (!QAformData.question || !QAformData.answer) {
      alert("QA Field is empty");
      return;
    }
    setQAs((prev) => [...prev, QAformData]);
    setQAFormData({ question: "", answer: "" });
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!Url.address) {
      alert("URL address Field is empty");
      return;
    }
    setLinks((prev) => [...prev, Url]);
    setUrl({ address: "" });
  };

  async function uploadImage(Image) {
    try {
      if (!Image) {
        showFailureToast("No image selected !!");
        return null;
      }
      const storageRef = ref(storage, `uploads/${Image.name}`);
      await uploadBytes(storageRef, Image);
      return await getDownloadURL(storageRef);
    } catch (error) {
      showFailureToast(`Error uploading file : ${error}`);
      throw error;
    }
  }

  const handleFormsSubmition = async () => {
    withLoading(async () => {
      const HeroImgUrl = await uploadImage(HeroImage);
      const HeaderImgUrl = await uploadImage(HeaderImage);
      const UrlFormatted = UrlTitle?.replaceAll(" ", "-");
      const finalObj = {
        ...Form,
        HeaderImgUrl,
        HeroImgUrl,
        QAs,
        Links,
        Url: UrlFormatted,
        directionRtL: isToggleOn,
        htmlContent,
      };

      const res = await UploadBlog(finalObj);
      if (res) showSuccessToast("Successfully added the blog !!");

      setForm({
        HeroParag: "",
        HeroTitle: "",
        HeaderTitle: "",
        HeaderAuthor: "",
        HeaderPublishedDate: "",
        Headerdescribtion: "",
        HeroImgUrl: "",
        HeaderImgUrl: "",
      });
      setQAs([]);
      setLinks([]);
      setIsToggleOn(false);
      setUrlTitle("");
      setHeroImage(null);
      setHeaderImage(null);
      setHtmlContent("");
    });
  };

  return (
    <section className="w-full">
      <ToastContainer transition={Slide} style={{ width: "90%", maxWidth: "360px" }} />
      <div className="w-[90%] mx-auto">
        <div className="flex items-center gap-3">
          <h3 className="m-1">فارسی ؟</h3>
          <IosToggleSwitch value={isToggleOn} onChange={setIsToggleOn} />
        </div>

        {/* Hero Section */}
        <div className="w-full mt-10">
          <h2 className={`text-3xl font-semibold my-6 ${isToggleOn ? "flex justify-end" : ""}`}>
            {isToggleOn ? "بخش قهرمان" : "Hero"}
          </h2>
          <div className={`w-full grid gap-4 max-md:grid-cols-1 ${isToggleOn ? "[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]" : "grid-cols-3"}`}>
            <InputField label="URL Title" value={UrlTitle} onChange={(e) => setUrlTitle(e.target.value)} placeholder="Enter URL Title" />
            <InputField label="Title" name="HeroTitle" value={Form.HeroTitle} onChange={handleChange} placeholder="Enter title" />
            <InputField label="Paragraph" name="HeroParag" value={Form.HeroParag} onChange={handleChange} placeholder="Enter paragraph" />
            <Card>
              <span className="text-gray-600 font-medium mb-2 block">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeroImage(e.target.files[0])}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 file:cursor-pointer file:bg-gray-400 file:text-white file:rounded-lg"
              />
            </Card>
          </div>
        </div>

        {/* Header Section */}
        <div className="w-full mt-10">
          <h2 className={`text-3xl font-semibold my-6 ${isToggleOn ? "flex justify-end" : ""}`}>
            {isToggleOn ? "بخش هدر جذاب" : "Header"}
          </h2>
          <div className={`w-full grid gap-4 max-md:grid-cols-1 ${isToggleOn ? "[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]" : "grid-cols-3"}`}>
            <InputField label="Title" name="HeaderTitle" value={Form.HeaderTitle} onChange={handleChange} placeholder="Enter title" />
            <InputField label="Author" name="HeaderAuthor" value={Form.HeaderAuthor} onChange={handleChange} placeholder="Enter author" />
            <InputField label="Description" name="Headerdescribtion" value={Form.Headerdescribtion} onChange={handleChange} placeholder="Enter description" />
            <InputField label="Published Date" name="HeaderPublishedDate" value={Form.HeaderPublishedDate} onChange={handleChange} placeholder="Enter date" />
            <Card>
              <span className="text-gray-600 font-medium mb-2 block">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeaderImage(e.target.files[0])}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 file:cursor-pointer file:bg-gray-400 file:text-white file:rounded-lg"
              />
            </Card>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full mt-10">
          <h2 className={`text-3xl font-semibold my-6 ${isToggleOn ? "flex justify-end" : ""}`}>
            {isToggleOn ? "بخش مطالب اصلی" : "Content"}
          </h2>
          <FroalaEditorComponent OnSubmit={setHtmlContent} />
        </div>

        {/* QA Section */}
        <form onSubmit={handleQASubmit} className="w-full mt-10">
          <h2 className={`text-3xl font-semibold my-6 ${isToggleOn ? "flex justify-end" : ""}`}>
            {isToggleOn ? "بخش سوال و پاسخ" : "QA"}
          </h2>
          <div className={`w-full grid gap-4 max-md:grid-cols-1 ${isToggleOn ? "[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]" : "grid-cols-3"}`}>
            <InputField label="Question" name="question" value={QAformData.question} onChange={handleQAChange} placeholder="Enter question" />
            <TextAreaField label="Answer" name="answer" value={QAformData.answer} onChange={handleQAChange} placeholder="Enter answer" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start mt-4">
            <button type="submit" className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition">
              Add
            </button>
            <div className="flex flex-wrap gap-2">
              {QAs.map((qa) => (
                <p key={qa.question} className="h-[60px] rounded-full bg-gray-300 px-4 py-2 flex items-center gap-2">
                  {shortenString(qa.question, 8)}
                  <button>
                    <AiOutlineClose />
                  </button>
                </p>
              ))}
            </div>
          </div>
        </form>

        {/* Links Section */}
        <form onSubmit={handleUrlSubmit} className="w-full mt-10">
          <h2 className={`text-3xl font-semibold my-6 ${isToggleOn ? "flex justify-end" : ""}`}>
            {isToggleOn ? "(لینک ها (ادرس ها" : "Links"}
          </h2>
          <div className={`w-full grid gap-4 max-md:grid-cols-1 ${isToggleOn ? "[grid-template-columns:_repeat(3,_1fr)] [direction:rtl]" : "grid-cols-3"}`}>
            <InputField label="Link" name="address" value={Url.address} onChange={handleUrlChange} placeholder="Enter link" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start mt-4">
            <button type="submit" className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition">
              Add
            </button>
            <div className="flex flex-wrap gap-2">
              {Links.map((lin) => (
                <p key={lin.address} className="h-[60px] rounded-full bg-gray-300 px-4 py-2 flex items-center gap-2">
                  {shortenString(lin.address, 8)}
                  <button>
                    <AiOutlineClose />
                  </button>
                </p>
              ))}
            </div>
          </div>
        </form>

        {/* Submit */}
        <button
          onClick={handleFormsSubmition}
          className="w-[300px] h-[80px] bg-green-400 ml-auto block mt-12 rounded-full text-gray-600 duration-200 hover:scale-95 transition"
        >
          {loading ? <SpinningLoading size={8} /> : isToggleOn ? "نشر" : "Publish"}
        </button>
      </div>
    </section>
  );
};

export default Page;
