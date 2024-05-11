import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import axios from "axios";

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Active",
//     value: "active",
//   },
//   {
//     label: "Blocked",
//     value: "blocked",
//   },
// ];

const TABLE_HEAD = ["Name", "email", "Phone"];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedTab, setSelectedTab] = useState("all");
  const [tableRows, setTableRows] = useState([]); // State for table rows

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  const filteredRows = tableRows.filter((row) => {
    const isMatchingTab = selectedTab === "all" || row.status === selectedTab;
    const isMatchingSearch = Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    return isMatchingTab && isMatchingSearch;
  });

  // Pagination logic
  //   const sortedRows = filteredRows.sort((a, b) => {
  //     // Function to standardize date format
  //     const standardizeDate = (dateStr) => {
  //       const [day, month, year] = dateStr.split("/");
  //       return new Date(
  //         `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`
  // //       );
  // //     };

  //     // Standardize date format for comparison
  //     const dateA = standardizeDate(a.placed_date);
  //     const dateB = standardizeDate(b.placed_date);

  //     // Sort by newest date first by subtracting dateA from dateB
  //     return dateB - dateA;
  //   });

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpdateStatus = (index, newStatus) => {
    // Create a copy of the current items array
    const updatedItems = [...currentItems];
    // Update the status of the selected item
    updatedItems[index].status = newStatus;
    // Update the state with the modified items array
    setTableRows(updatedItems);
  };

  const handleGetCustomerData = async () => {
    // setLoading(true);
    const accessToken = sessionStorage.getItem("adminToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/customers/viewcustomers`,
        {
          token: accessToken,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTableRows(response.data.customers);
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
  }, []);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Customers list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all customers
          </Typography>
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleTabChange(value)}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            value={searchQuery}
            onChange={handleSearch}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div> */}
      <div className="bg-white overflow-scroll h-lvh w-full">
        <table className=" w-full  table-auto text-left overflow-scroll ">
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
                    {/* {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" onClick={() => handleSort(head)}/>
                    )} */}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map(
              ({ img, firstName, email, phone, address, status }, index) => {
                const isLast = index === currentItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {firstName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phone}
                      </Typography>
                    </td>

                    {/* <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status}
                          color={
                            status == "active"
                              ? "green"
                              : status == "blocked"
                              ? "green"
                              : "red"
                          }
                        />
                      </div>
                    </td> */}

                    {/* <td className={classes}>
                      <Tooltip content="Update Status">
                        <Popover
                          placement="right"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <PopoverHandler>
                            <IconButton variant="text">
                              <PencilSquareIcon className="h-4 w-4" />
                            </IconButton>
                          </PopoverHandler>
                          <PopoverContent>
                            <ul>
                              <li
                                className="mb-1 text-center rounded-md p-1 bg-blue-400 cursor-pointer text-white font-bold "
                                onClick={() =>
                                  handleUpdateStatus(index, "active")
                                }
                              >
                                Active
                              </li>
                              <li
                                className="p-1 text-center rounded-md  bg-orange-600 cursor-pointer text-white font-bold"
                                onClick={() =>
                                  handleUpdateStatus(index, "blocked")
                                }
                              >
                                Blocked
                              </li>
                            </ul>
                          </PopoverContent>
                        </Popover>
                      </Tooltip>
                    </td> */}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className=" sticky bottom-0 bg-white z-10 flex items-center justify-between border-t border-blue-gray-50 p-4">
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
