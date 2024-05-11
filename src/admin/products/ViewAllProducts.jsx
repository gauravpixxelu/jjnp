import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  XCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Chip,
  IconButton,
  Input,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  Checkbox,
  CardFooter,
} from "@material-tailwind/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";

const TABLE_HEAD = [
  "Product",
  "Sizes",
  "Colors",
  "Actual Price",
  "Discounted Price",
  "Discount",
  "Category",
  "Slug",
  "Inventory",
  "Status",
  "Update",
];

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
// Options for filtering by categories
const categoryOptions = [
  { id: 1, value: "mens", label: "Men" },
  { id: 2, value: "women", label: "Women" },
  { id: 3, value: "kids", label: "Kids" },
];

// Options for filtering by sizes
const sizeOptions = [
  { id: 1, value: "XS", label: "XS" },
  { id: 2, value: "S", label: "S" },
  { id: 3, value: "M", label: "M" },
  { id: 4, value: "L", label: "L" },
  { id: 5, value: "XL", label: "XL" },
  { id: 6, value: "XXL", label: "XXL" },
];

// Options for sorting
const sortByOptions = [
  { id: 1, value: "price_high_to_low", label: "Price high to Low" },
  { id: 2, value: "price_low_to_high", label: "Price Low to high" },
  { id: 3, value: "discount", label: "Discount" },
];

export default function ViewAllProducts() {
  const animatedComponents = makeAnimated();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [tableRows, setTableRows] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false); // Flag to indicate if editing mode is active
  const [selectedColors, setSelectedColors] = useState([]);
  const [inputImageValue, setInputImageValue] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedEditSizes, setSelectedEditSizes] = useState([]);
  const [selectedEditColors, setSelectedEditColors] = useState([]);

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
    id: "",
    quantity: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

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
          images: [
            ...prevFormData.images,
            ...updatedImages.map((img) => img.data),
          ],
        }));
      })
      .catch((error) => {});
  };

  const handleColorChange = (color) => {
    const updatedColors = selectedEditColors.includes(color)
      ? selectedEditColors.filter((c) => c !== color)
      : [...selectedEditColors, color];

    setSelectedEditColors(updatedColors);
    setFormData((prevFormData) => ({
      ...prevFormData,
      color: updatedColors,
    }));
  };

  const handleSizeChange = (size) => {
    const updatedSizes = selectedEditSizes.includes(size)
      ? selectedEditSizes.filter((s) => s !== size)
      : [...selectedEditSizes, size];

    setSelectedEditSizes(updatedSizes);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sizes: updatedSizes,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRemoveImage = (index) => {
    // Remove the image from selectedImages state
    setSelectedImages((prevImages) =>
      prevImages.filter((img, i) => i !== index)
    );

    // Remove the image from formData.images
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((img, i) => i !== index),
    }));
  };

  const handleOpen = () => setOpen(!open);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSortByChange = (selectedOption) => {
    setSelectedSortBy(selectedOption);
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedItems = [...tableRows];
    updatedItems[index].status = newStatus;
    setTableRows(updatedItems);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/productsAdmin/getproducts`,
        {
          slug: false,
          category: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const mappedProducts = response.data.products.map((product) => ({
        id: product._id,
        productName: product.title,
        discountedPrice:
          product.price - (product.price * product.discount) / 100,
        description: product.desc,
        originalPrice: product.price,
        discount: product.discount,
        colors: product.color,
        categories: product.category,
        sizes: product.size,
        productImages: product.imgs,
        inventory: product.availableQty,
        status: product.availableQty > 0 ? "in stock" : "out of stock",
        slug: product.slug,
      }));
      setTableRows(mappedProducts);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = tableRows.filter((row) => {
    const isMatchingSearch = Object.values(row).some(
      (value) => value && value.toString().toLowerCase().includes(searchQuery)
    );
    return isMatchingSearch;
  });

  const filteredByCategories =
    selectedCategories.length > 0
      ? filteredProducts.filter((product) =>
          selectedCategories.some((selectedCategory) =>
            product.categories.includes(selectedCategory.value)
          )
        )
      : filteredProducts;

  const filteredBySizes =
    selectedSizes.length > 0
      ? filteredByCategories.filter((product) =>
          selectedSizes.some((selectedSize) =>
            product.sizes.includes(selectedSize.value)
          )
        )
      : filteredByCategories;

  let sortedProducts = [...filteredBySizes];
  if (selectedSortBy) {
    switch (selectedSortBy.value) {
      case "price_high_to_low":
        sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "price_low_to_high":
        sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "discount":
        sortedProducts.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
  }

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditProduct = async (product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      productName: product.productName,
      description: product.description,
      price: product.originalPrice,
      slug: product.slug,
      category: product.categories,
      discount: product.discount,
      color: product.colors,
      sizes: product.sizes,
      images: product.productImages,
      quantity: product.inventory,
    });
    setSelectedEditColors(product.colors.map((color) => color.toLowerCase()));
    setSelectedEditSizes(product.sizes);
    setEditing(true);
    setOpen(true);
  };

  const handleSaveChanges = async () => {
    // Compare current form data with original product data
    // const isDataChanged = Object.keys(formData).some((key) => {
    //   if (Array.isArray(formData[key])) {
    //     return (
    //       JSON.stringify(formData[key]) !== JSON.stringify(editingProduct[key])
    //     );
    //   } else {
    //     return formData[key] !== editingProduct[key];
    //   }
    // });

    // If there are no changes, return early
    // if (!isDataChanged) {
    //   handleCloseDialog();
    //   return;
    // }
    // Send a request to update the product details on the server
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/productsAdmin/updateproduct`,
        {
          _id: formData.id,
          title: formData.productName,
          category: formData.category,
          desc: formData.description,
          price: formData.price,
          availableQty: formData.quantity,
          size: formData.sizes,
          color: formData.color,
          slug: formData.slug,
          postImages: formData.images,
          discount: formData.discount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchProducts();
      handleCloseDialog();
    } catch (error) {}
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditing(false);
  };

  const deleteProduct = async (productSlug) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/productsAdmin/deleteproduct`,
        {
          data: { slug: productSlug }, // Place the data inside the config object
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchProducts();
      handleCloseDialog(); // Refresh products after deletion
    } catch (error) {}
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            All Products list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all products
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10 z-20">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row p-2 z-20">
            <div className="m-2">
              <Select
                placeholder={"Filter by Categories"}
                closeMenuOnSelect={true}
                components={animatedComponents}
                value={selectedCategories}
                onChange={setSelectedCategories}
                isMulti
                options={categoryOptions}
                className="w-80 lg:w-fit z-40"
              />
            </div>
            <div className="m-2">
              <Select
                placeholder={"Filter by Size"}
                closeMenuOnSelect={true}
                components={animatedComponents}
                value={selectedSizes}
                onChange={setSelectedSizes}
                isMulti
                options={sizeOptions}
                className="w-80 lg:w-fit z-30"
              />
            </div>
            <Select
              className="m-2 lg:w-max z-20"
              placeholder={"Sort by"}
              options={sortByOptions}
              onChange={handleSortByChange}
            />
          </div>
        </div>
        <Input
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </div>
      <div className="bg-white overflow-scroll h-lvh w-full">
        <table className="w-full table-auto text-left overflow-scroll">
          <thead className="sticky top-0 bg-red-200 z-10">
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map(
              (
                {
                  id,
                  slug,
                  productImages,
                  productName,
                  discount,
                  sizes,
                  colors,
                  discountedPrice,
                  originalPrice,
                  categories,
                  status,
                  inventory,
                  description,
                },
                index
              ) => {
                const isLast = index === currentItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={productImages[0]} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {productName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal uppercase"
                        >
                          {sizes.join(", ")}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal uppercase"
                        >
                          {colors.join(", ")}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {originalPrice.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {discountedPrice.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {discount}%
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {categories}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {slug}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {inventory}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color={status === "in stock" ? "green" : "red"}
                          className="w-fit"
                        />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <button
                        className="p-2"
                        onClick={() => {
                          handleEditProduct({
                            id,
                            productName,
                            productImages,
                            discount,
                            sizes,
                            colors,
                            discountedPrice,
                            categories,
                            status,
                            slug,
                            description,
                            inventory,
                          });
                        }}
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        <div className="sticky bottom-0 bg-white z-10 flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-auto h-full">
        <Dialog
          size="xxl"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none overflow-auto"
        >
          <Card className=" w-full overflow-auto">
            <CardBody className="flex flex-col gap-4 overflow-auto">
              <div className="overflow-auto">
                <DialogHeader color="blueGray">
                  <Typography variant="h6">
                    {editing ? "Edit Product" : "Add Product"}
                  </Typography>
                </DialogHeader>
                <DialogBody className="overflow-auto">
                  <div className="flex flex-col gap-2">
                    <div className="lg:flex gap-2 w-full">
                      <div className="w-full">
                        <label htmlFor="productName">Name:</label>
                        <Input
                          type="text"
                          color="lightBlue"
                          placeholder="Product Name"
                          value={formData.productName}
                          name="productName"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="description">Description:</label>
                        <Input
                          type="text"
                          color="lightBlue"
                          placeholder="Description"
                          value={formData.description}
                          name="description"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="lg:flex gap-2 w-full">
                      <div className="w-full">
                        <label htmlFor="price">Price:</label>
                        <Input
                          type="number"
                          color="lightBlue"
                          placeholder="Price"
                          value={formData.price}
                          name="price"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="slug">Slug:</label>
                        <Input
                          type="text"
                          color="lightBlue"
                          placeholder="Slug"
                          value={formData.slug}
                          name="slug"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="lg:flex gap-2 w-full">
                      <div className="w-full">
                        <label htmlFor="category">Category:</label>
                        <Input
                          type="text"
                          color="lightBlue"
                          placeholder="Category"
                          value={formData.category}
                          name="category"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="discount">Discount (%):</label>
                        <Input
                          type="number"
                          color="lightBlue"
                          placeholder="Discount"
                          value={formData.discount}
                          name="discount"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="lg:flex gap-2 w-full">
                      <div className="w-full">
                        <label htmlFor="colors">Colors:</label>
                        <div className="flex flex-wrap uppercase">
                          {availableColors.map((color) => (
                            <Checkbox
                              key={color}
                              checked={selectedEditColors.includes(color)}
                              onChange={() => handleColorChange(color)}
                              label={color}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-full">
                        <label htmlFor="sizes">Sizes:</label>
                        <div className="flex flex-wrap uppercase">
                          {availableSizes.map((size) => (
                            <Checkbox
                              key={size}
                              checked={selectedEditSizes.includes(size)}
                              onChange={() => handleSizeChange(size)}
                              label={size}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <label htmlFor="quantity">Quantity:</label>
                    <Input
                      type="number"
                      color="lightBlue"
                      placeholder="Quantity"
                      value={formData.quantity}
                      name="quantity"
                      onChange={handleChange}
                    />
                    <div className="flex gap-2">
                      <label htmlFor="images">Images:</label>
                      <div className="flex flex-wrap gap-2">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
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
                          className="hidden border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:border-blue-500 mb-5"
                          multiple
                        />
                        <label
                          className="mb-3 mt-2 inline-flex items-center px-4 py-2 bg-gray-300 text-gray-900 rounded-lg cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                          htmlFor="images"
                        >
                          <PhotoIcon className="w-5 h-5 mr-2 " /> Select Images
                        </label>
                      </div>
                    </div>
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button
                    onClick={handleSaveChanges}
                    color="blue"
                    ripple="dark"
                    className="mr-2"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => {
                      deleteProduct(formData.slug);
                    }}
                    color="red"
                    ripple="dark"
                    className="mr-2"
                  >
                    Remove Product
                  </Button>
                  <Button
                    onClick={handleCloseDialog}
                    color="gray"
                    ripple="dark"
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </div>
            </CardBody>
          </Card>
        </Dialog>
      </div>
    </div>
  );
}
