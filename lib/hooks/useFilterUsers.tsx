import { FullUser } from "@/components/chat/chat-list";
import { User } from "@prisma/client";
import { Users } from "lucide-react";
import React, { useState } from "react";

const useFilterUsers = () => {
  const [allUsers, setAllUsers] = useState<FullUser[]>();
  const [isCustomer, setIsCutomer] = useState<boolean>(false);
  const [employeeUsers, setEmployeeUsers] = useState<User[]>();
  const [customerUsers, setCustomerUsers] = useState<User[]>();

  const filterUsers = (users: FullUser[], isUserCustomer: boolean) => {
    setIsCutomer(isCustomer);
    setAllUsers(users);
    const employees = getEmployees(users);
    setEmployeeUsers(employees);

    if (!isUserCustomer) {
      const customers = getCustomers(users);

      setCustomerUsers(customers);
    }
  };

  const removeUser = (userId: string) => {
    const newUsers = allUsers?.filter((user) => user.id !== userId);
    if (newUsers) {
      filterUsers(newUsers, isCustomer);
    }
  };

  const getEmployees = (users: FullUser[]) => {
    const employees = users.filter(
      (user) => user.roles?.some((role) => role.role === "EMPLOYEE"),
    );

    return employees;
  };

  const getCustomers = (users: FullUser[]) => {
    const customers = users.filter(
      (user) => user.roles?.some((role) => role.role === "CUSTOMER"),
    );
    return customers;
  };

  return {
    filterUsers,
    employees: employeeUsers,
    customers: customerUsers,
    removeUser,
  };
};

export default useFilterUsers;
