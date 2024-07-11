import React from "react";
import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Avatar,
  Badge,
  Separator,
  Chip,
} from "@material-tailwind/react";
import { useLocation, useParams } from "react-router-dom";
export default function PrintContent() {
  const location = useLocation();
  const order = location.state.order;
  const isLast = false;
  const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";
  return (
    <div className="flex items-center justify-center p-2">
      <Card className="w-full p-3 border-2 border-gray-800 rounded-md">
        <CardBody className="space-y-6">
          <div className="flex items-center ">
            <ShoppingBagIcon className="h-5 w-5" />
            <div className="font-bold">Order #{order.id}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2 text-gray-900">
              <div className="flex items-center space-x-2">
                <label className="w-1/4" htmlFor="customer">
                  Customer:
                </label>
                <div className="flex items-center space-x-2">
                  <div>{order.customer_name}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/4" htmlFor="email">
                  Email:
                </label>
                <div className="flex items-center space-x-2">
                  <div>{order.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/4" htmlFor="phone">
                  Phone:
                </label>
                <div className="flex items-center space-x-2">
                  <div>{order.phone}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/4" htmlFor="address">
                  Address:
                </label>
                <div className="flex items-center space-x-2">
                  <div>{order.address}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="w-1/3" htmlFor="date">
                  Order date
                </label>
                <div>{order.placed_date}</div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3" htmlFor="status">
                  Status
                </label>
                <Chip className="text-white bg-blue-600" value={order.status}>
                  {order.status}
                </Chip>
              </div>
            </div>
          </div>

          <div></div>
          <div>
            <div className="overflow-auto">
              <table className="table-fixed w-full lg:w-1/2 ">
                <thead>
                  <tr className="text-sm font-medium">
                    <td className={classes}>Image</td>
                    <td className={classes}>Product</td>
                    <td className={classes}>Price</td>
                    <td className={classes}>Quantity</td>
                    <td className={classes}>Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={classes}>
                      <img
                        alt={order.product_name}
                        className="aspect-square w-20 h-20 lg:w-24 lg:h-24 overflow-hidden rounded-lg object-cover border"
                        src={order.img}
                      />
                    </td>
                    <td className={classes}>
                      <div>
                        <div className="font-medium">{order.product_name}</div>
                        <div className="text-sm text-gray-500">
                          {order.color}
                        </div>
                      </div>
                    </td>
                    <td className={classes}>{order.price}</td>
                    <td className={classes}>{order.qty}</td>
                    <td className={classes}>$12.00</td>
                  </tr>
                  {/* Additional table rows */}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="w-1/3" htmlFor="subtotal">
                Subtotal
              </label>
              <div>$95.00</div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-1/3" htmlFor="shipping">
                Shipping
              </label>
              <div>$10.00</div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-1/3" htmlFor="tax">
                Tax (10%)
              </label>
              <div>$10.50</div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="w-1/3" htmlFor="total">
                Total
              </label>
              <div className="font-bold">$115.50</div>
            </div>
          </div>
          <div></div>
          <div className="flex items-center space-x-2">
            <label className="w-1/3" htmlFor="payment">
              Payment method
            </label>
            <div>Credit card</div>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex justify-end space-x-2">
            <Button variant="outlined">Refund</Button>
            <Button>Print</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
