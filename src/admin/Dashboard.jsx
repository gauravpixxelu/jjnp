import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export default function Dashboard() {
  const chartRef = useRef(null);

  const [customersCount, setCustomersCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  const handleGetCustomerData = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/customers/viewcustomers`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCustomersCount(response.data.customers.length);

      // setTableRows(mappedProducts);
      // setLoading(false);

      // navigate("/");
    } catch (error) {

      // setLoading(false);
    } finally {
      // setLoading(false);
    }
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
      const productQuantities = response.data.products.map(
        (product) => product.availableQty
      );
      setProducts(productQuantities);

      const productName = response.data.products.map(
        (product) => product.title
      );
      setProductName(productName);
    } catch (error) {
    }
  };

  const handlGetOrders = async () => {
    // setLoading(true);
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getorders`,
        {
          token: accessToken1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Sort orders by created time
      const sortedOrders = response.data.orders.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setOrdersData(sortedOrders);
      // setTableRows(mappedProducts);
      // setLoading(false);

      // navigate("/");
    } catch (error) {

      // setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCustomerData();
    fetchProducts();
    handlGetOrders();
  }, []);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: productName, // Assuming product indices as labels
          datasets: [
            {
              label: "Product Inventory",
              data: products,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Quantity",
              },
            },
            x: {
              title: {
                display: true,
                text: "Product",
              },
            },
          },
        },
      });
    }
  }, [products]);

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="p-3 w-fit h-20 rounded-lg bg-blue-200 flex flex-col items-center justify-center">
        <h2>Total Customers</h2>
        <h3>{customersCount}</h3>
      </div>

      <div>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
