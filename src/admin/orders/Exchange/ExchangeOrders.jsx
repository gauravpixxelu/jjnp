import React, { useState, useEffect } from "react";
import {
    MagnifyingGlassIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    Input,
    Typography,
    Button,
    Tabs,
    TabsHeader,
    Tab,
    Chip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TABLE_HEAD = [
    "Order Id",
    "Cancel Reason",
    "Explanation",
    "Placed Date",
    "Payment Status",
    "Order Status",
    "Refund Remark",
    "More Details"
];

export default function ExchangeOrders() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [tableRows, setTableRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        setCurrentPage(1); // Reset page to 1 when searching
    };

    const filteredRows = tableRows.filter((row) => {
        const isMatchingSearch = Object.values(row).some(
            (value) => value && value.toString().toLowerCase().includes(searchQuery)
        );
        return isMatchingSearch;
    });

    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOrderClick = (order) => {
        handleGetOrdersData(order.orderId)
        // navigate(`/manageReturnOrder/${order.orderId}`, { state: { order: order } });
    };

    const handleGetOrdersData = async (orderId) => {
        let body;
        if (orderId == undefined) {
            body = {
              exchange: true ,
            }
        }
        else {
            body = {
                orderId: orderId == undefined ? "" : orderId,
            }
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/ordersAdmin/getorders`,
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (orderId !== undefined) {
                let order = response.data.orders
                console.log(order);
                navigate(`/manageOrder/${order.orderId}`, { state: { order: order } });
                return;
            }
            const sortedOrders = response.data.orders
                .sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });
            setTableRows(sortedOrders);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        handleGetOrdersData();
    }, []);

    return (
        <div>
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Cancelled Orders
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        See information about returned orders
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
                <div className="w-full md:w-72">
                    <Input
                        label="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                </div>
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
                        {currentItems.map((product, productIndex) => (
                            <tr key={productIndex}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    {/* {order.products.map((product, productIndex) => ( */}
                                    <div key={productIndex}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.orderId}
                                        </Typography>
                                        {/* <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70 uppercase"
                                        >
                                            {product.size}, {product.color}
                                        </Typography> */}
                                    </div>
                                    {/* ))} */}
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.cancelReason}
                                        </Typography>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {product.explanation}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {new Date(product.createdAt).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </Typography>
                                </td>
                               
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="w-max">
                                        <Chip
                                            variant="ghost"
                                            size="sm"
                                            value={product.status}
                                            color={
                                                product.status === "paid"
                                                    ? "green"
                                                    : product.status === "pending"
                                                        ? "blue"
                                                        : "deep-orange"
                                            }
                                        />
                                    </div>
                                </td>
                             
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="w-max">
                                        <Chip variant="ghost" size="sm" value={'Cancelled'} />
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {product.refundRemark}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <span
                                        className="flex items-center justify-center text-blue-700 cursor-pointer"
                                        onClick={() => handleOrderClick(product)}
                                    >
                                        <p className="text-base">View Details</p>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
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
        </div>
    );
}
