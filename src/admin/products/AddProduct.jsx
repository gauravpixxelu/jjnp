import React, { useState, useEffect } from "react";
import {
  Radio,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Chip,
  ButtonGroup,
  Checkbox,
} from "@material-tailwind/react";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader";
import axios from "axios";
import Toast from "../../components/Toast";

const availableColors = [
  "red",
  "blue",
  "white",
  "green",
  "black",
  "yellow",
  "pink",
  "purple",
  "orange",
  "gray",
  "brown",
  "beige",
  "navy",
  "maroon",
  "olive",
  "gold",
  "silver",
  "lavender",
  "peach",
  "burgundy",
  "khaki",
  "mustard",
  "tan",
  "salmon",
  "indigo",
  "violet",
  "cyan",
  "magenta",
  "teal",
  "peacock",
  "baby blue",
  "pale pink",
  "denim",
  "sky blue",
];

const availableSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "36",
  "38",
  "40",
  "42",
];
export default function AddProduct() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [inputImageValue, setInputImageValue] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const handleOpen = () => setOpen((cur) => !cur);
  const [formErrors, setFormErrors] = useState({});
  const [colorInput, setColorInput] = useState("");

  const [sizeInput, setSizeInput] = useState("");

  const handleSizeInputChange = (e) => {
    setSizeInput(e.target.value);
  };

  const handleSizeInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addSizesFromInput();
    }
  };

  const addSizesFromInput = () => {
    const sizesToAdd = sizeInput
      .split(/[\s,]+/)
      .filter((size) => size.trim() !== "");

    const uniqueSizesToAdd = sizesToAdd.filter(
      (size) => !selectedSizes.includes(size)
    );

    setSelectedSizes([...selectedSizes, ...uniqueSizesToAdd]);
    setSizeInput("");
  };

  const handleColorInputChange = (e) => {
    setColorInput(e.target.value);
  };

  const handleColorInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addColorsFromInput();
    }
  };

  const addColorsFromInput = () => {
    const colorsToAdd = colorInput
      .split(/[\s,]+/)
      .filter((color) => color.trim() !== "");

    const uniqueColorsToAdd = colorsToAdd.filter(
      (color) => !selectedColors.includes(color)
    );

    setSelectedColors([...selectedColors, ...uniqueColorsToAdd]);
    setColorInput("");
  };

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
    } else {
      setSelectedColors((prevColors) => [...prevColors, color]);
    }
  };

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes((prevSizes) => prevSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes((prevSizes) => [...prevSizes, size]);
    }
  };
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const base64Images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await convertToBase64(file);
      base64Images.push(base64);
    }

    Promise.all(base64Images)
      .then((base64Array) => {
        // Set the base64 images to state or handle them as needed
        const updatedImages = base64Array.map((base64, index) => ({
          id: index, // You can use any unique identifier for the image
          data: base64,
        }));
        setSelectedImages((prevImages) => [...prevImages, ...updatedImages]);

        // After setting the selected images, update the form data
        setFormData((prevFormData) => ({
          ...prevFormData,
          color: selectedColors,
          sizes: selectedSizes,
          images: [...prevFormData.images, ...updatedImages],
        }));
      })
      .catch((error) => {
        console.error("Error converting files to base64:", error);
      });
  };

  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const imagesArray = Array.from(files).map((file) =>
  //     URL.createObjectURL(file)
  //   );
  //   setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
  // };

  const handleInputImageKeyPress = (e) => {
    if (e.key === "Enter" && inputImageValue.trim() !== "") {
      setSelectedImages((prevImages) => [
        ...prevImages,
        inputImageValue.trim(),
      ]);
      setInputImageValue("");
    }
  };

  const handleRemoveColor = (color) => {
    setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
  };

  const handleRemoveSize = (size) => {
    setSelectedSizes((prevSizes) => prevSizes.filter((s) => s !== size));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img, i) => i !== index)
    );
  };

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    slug: "",
    category: "",
    discount: 0,
    color: [],
    sizes: [],
    images: [],
    quantity: 0,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Basic validation
    if (name === "productName" && value.trim() === "") {
      error = "Product name is required";
    } else if (name === "slug" && value.trim() === "") {
      error = "Slug is required";
    } else if (name === "category" && value.trim() === "") {
      error = "Category is required";
    } else if (name === "description" && value.trim() === "") {
      error = "Description is required";
    } else if (name === "price" && (isNaN(value) || value.trim() === "")) {
      error = "Price must be a number";
    } else if (name === "discount" && (isNaN(value) || value.trim() === "")) {
      error = "Discount must be a number";
    } else if (name === "quantity" && (isNaN(value) || value.trim() === "")) {
      error = "Quantity must be a number";
    }

    // Update form data and errors
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const handleAddProduct = async () => {
    // Validate form before submitting
    const errors = {};
    if (formData.productName.trim() === "") {
      errors.productName = "Product name is required";
    }
    if (formData.slug.trim() === "") {
      errors.slug = "Slug is required";
    }
    if (formData.category.trim() === "") {
      errors.category = "Category is required";
    }
    if (formData.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (isNaN(formData.price) || formData.price.trim() === "") {
      errors.price = "Price must be a number";
    }
    if (isNaN(formData.discount) || formData.discount === "") {
      errors.discount = "Discount must be a number";
    }
    if (isNaN(formData.quantity) || formData.quantity === 0) {
      errors.quantity = "Quantity must be a number";
    }

    // Validate images
    if (selectedImages.length === 0) {
      errors.images = "At least one image is required";
    }
    if (selectedColors.length === 0) {
      errors.images = "At least one color is required";
    }
    if (selectedSizes.length === 0) {
      errors.images = "At least one size is required";
    }

    if (Object.keys(errors).length === 0) {
      // No errors, proceed with adding product
      setLoading(true);
      const imageDataUrls = selectedImages.map((image) => image.data);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/productsAdmin/addproducts`,
          {
            title: formData.productName,
            slug: formData.slug,
            desc: formData.description,
            images: imageDataUrls,
            category: formData.category,
            size: formData.sizes,
            color: formData.color,
            price: formData.price,
            availableQty: formData.quantity,
            discount: formData.discount,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setLoading(false);
        setFormData({
          productName: "",
          description: "",
          price: "",
          slug: "",
          category: "",
          discount: 0,
          color: "",
          sizes: "",
          images: "",
          quantity: 0,
        });
        setToastMessage(response.data.message + "..!");

        // Clear form errors
        setFormErrors({});

        // Clear selected images
        setSelectedImages([]);
      } catch (error) {
        console.error("Error:", error);
        setToastMessage("Sorry " + error.response.data.message);

        setLoading(false);
      }
    } else {
      // Update errors in the state
      setFormErrors(errors);
    }
  };

  useEffect(() => {}, [loading, editing]);
  useEffect(() => {
    if (toastMessage) {
      // Set a timeout to remove the toast after 4000 milliseconds (4 seconds)
      const toastTimer = setTimeout(() => {
        setToastMessage("");
      }, 4000);

      // Clear both timeouts if the component unmounts or if toastMessage or isExploding changes
      return () => {
        clearTimeout(toastTimer);
      };
    }
  }, [toastMessage]);

  return (
    <div className="p-3 bg-snow-200">
      {loading && <Loader />}
      <div className="p-3 ">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Add New Product
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Add New Product
            </Typography>
          </div>
        </div>

        <div>
          <div className="flex flex-col ">
            <label htmlFor="productName">Name:</label>
            <input
              className="mt-2 text-sm w-full px-4 py-2 border border-gray-300 focus:outline-none  rounded mb-5"
              type="text"
              value={formData.productName}
              name="productName"
              placeholder="Product Name"
              onChange={handleChange}
            />
            <label htmlFor="slug">Slug:</label>
            <input
              className="mt-2 text-sm w-full px-4 py-2 border border-gray-300 focus:outline-none  rounded mb-5"
              type="text"
              value={formData.slug}
              name="slug"
              placeholder="Slug"
              onChange={handleChange}
            />
            <label htmlFor="category">Category:</label>
            <input
              className="mt-2 text-sm w-full px-4 py-2 border border-gray-300 focus:outline-none  rounded mb-5"
              type="text"
              value={formData.category}
              name="category"
              placeholder="Product Category"
              onChange={handleChange}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              className="mt-2 text-sm w-full px-4 py-2 border border-gray-300 focus:outline-none  rounded mb-5"
              type="text"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              name="description"
            />

            <label htmlFor="price">Price:</label>
            <input
              className="mt-2 text-sm w-full px-4 py-2 border border-gray-300 focus:outline-none  rounded mb-5"
              type="number"
              placeholder="Product Price"
              value={formData.price}
              onChange={handleChange}
              name="price"
            />
            <label htmlFor="discount">Discount(%):</label>
            <input
              className="mt-2 text-sm w-full px-4 py-2 border border-gray-300 focus:outline-none  rounded mb-5"
              type="number"
              value={formData.discount}
              name="discount"
              placeholder="Discount on Price"
              onChange={handleChange}
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              className="mt-2 text-sm w-full px-4 py-2 border border-gray-300 focus:outline-none  rounded mb-5"
              type="number"
              value={formData.quantity}
              name="quantity"
              placeholder="Product Inventory Quantity"
              onChange={handleChange}
            />
            <label htmlFor="colors">Colors:</label>
            {/* <div className="flex flex-wrap uppercase">
              {availableColors.map((color) => (
                <Checkbox
                  key={color}
                  checked={selectedColors.includes(color)}
                  onChange={() => handleColorChange(color)}
                  label={color}
                />
              ))}
            </div> */}
            <div className="flex flex-wrap uppercase flex-col gap-2">
              <div className="flex">
                <input
                  type="text"
                  value={colorInput}
                  onChange={handleColorInputChange}
                  onKeyDown={handleColorInputKeyDown}
                  className="border border-gray-300 p-1 mr-2 w-full focus:outline-none"
                  placeholder="Add multiple colors separated by commas or spaces"
                />
                <button
                  onClick={addColorsFromInput}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div>
                {selectedColors.map((color) => (
                  <span
                    key={color}
                    className={`inline-block bg-${color.toLowerCase()} px-2 py-1 rounded-full text-sm m-1`}
                  >
                    {color}
                    <span
                      className="ml-1 cursor-pointer"
                      onClick={() => handleRemoveColor(color)}
                    >
                      &#10006;
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <label htmlFor="size">Sizes:</label>
            {/* <div className="flex flex-wrap">
              {availableSizes.map((size) => (
                <Checkbox
                  key={size}
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  label={size}
                />
              ))}
            </div> */}
            <div className="flex flex-wrap flex-col gap-2">
              <div className="flex">
                <input
                  type="text"
                  value={sizeInput}
                  onChange={handleSizeInputChange}
                  onKeyDown={handleSizeInputKeyDown}
                  className="border p-1 mr-2 w-full focus:outline-none"
                  placeholder="Add multiple sizes separated by commas or spaces"
                />
                <button
                  onClick={addSizesFromInput}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  Add
                </button>
              </div>
              <div>
                {selectedSizes.map((size) => (
                  <span
                    key={size}
                    className="bg-gray-200 px-2 py-1 rounded-full text-sm m-1"
                  >
                    {size}
                    <span
                      className="ml-1 cursor-pointer"
                      onClick={() => handleRemoveSize(size)}
                    >
                      &#10006;
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <label htmlFor="images">Images:</label>
            <div className="flex flex-wrap gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.data}
                    alt={`Image ${index + 1}`}
                    className="w-20 h-20 mb-2 object-cover rounded"
                  />
                  <XCircleIcon
                    className="text-gray-900 h-5 w-5 absolute top-0 right-0 cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                name="images"
                id="images"
                onChange={(e) => handleImageChange(e)}
                className="hidden border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none  mb-5"
                multiple
              />
              <label
                className="mb-3 mt-2 inline-flex items-center px-4 py-2 bg-gray-300 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                htmlFor="images"
              >
                <PhotoIcon className="w-5 h-5 mr-2 " /> Select Images
              </label>
            </div>
            <div className="flex w-full  gap-2 mb-5 text-red-500 text-sm">
              {Object.keys(formErrors).map((fieldName) => (
                <div key={fieldName}>{formErrors[fieldName]}</div>
              ))}
            </div>
            <Button
              size="lg"
              variant="gradient"
              className="p-3 bg-slate"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}
