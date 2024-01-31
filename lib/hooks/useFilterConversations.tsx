import { FullConversation } from "@/components/chat/chat-list";
import React from "react";
import { getEmployeeUsers } from "../db/actions/user-actions";

const useFilterConversations = (conversations?: FullConversation[]) => {
  const getCustomerConversations = React.useCallback(() => {
    const customerUsers = conversations
      ?.filter((conversation) => {
        const roles = conversation.userConversation.user?.roles?.flatMap(
          (role) => role.role as string,
        );

        return roles?.includes("CUSTOMER");
      })
      .map((conversation) => conversation);

    return customerUsers;
  }, [conversations]);

  const getEmployeeConversations = React.useCallback(() => {
    const employeeUsers = conversations
      ?.filter((conversation) => {
        const roles = conversation.userConversation.user?.roles?.flatMap(
          (role) => role.role as string,
        );

        return roles?.includes("EMPLOYEE");
      })
      .map((conversation) => conversation);

    return employeeUsers;
  }, [conversations]);

  return { getCustomerConversations, getEmployeeConversations };
};

export default useFilterConversations;
