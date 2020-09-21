import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import { intersection } from "lodash";
export default function Home() {
  const currentUser = useSelector(state => state.currentUser);
  const [header, setHeader] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (currentUser.user.loggedIn) {
        const userId = currentUser.user.id || currentUser.user._id;
        const response = await Axios.get(
          `http://localhost:5000/users/${userId}/customers`,
          { headers: { "auth-token": localStorage.getItem("auth-token") } }
        );
        let customers = response.data.customers;
        setCustomers(response.data.customers);
        customers = customers.map((customer, customerIndex) => {
          return Object.keys(customer).map((keyCustomer, keyCustomerIndex) => {
            if (!["_id", ""].includes(keyCustomer)) {
              return keyCustomer;
            }
          });
        });
        const header = intersection(customers.flat()).filter(filterCustomer => {
          return { filterCustomer };
        });
        setHeader(header);
      }
    };
    fetchCustomers();
  }, [currentUser]);
  return (
    <div className="container">
      {currentUser.user.loggedIn ? (
        <div>
          <h3 className="text-center mt-5 mb-5">Customers</h3>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No</th>
                {header.map((head, headIndex) => {
                  return <th scope="col">{head}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, customerIndex) => {
                return (
                  <tr key={customerIndex}>
                    <th scope="row">{customerIndex + 1}</th>
                    {header.map((head, headIndex) => {
                      return <td key={headIndex}>{customer[head]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-center mt-5">
          Already Registered User? Click here to <a href="/login">login</a>
      </h4>
      )}
    </div>
  );
}
