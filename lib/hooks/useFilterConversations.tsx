import React from "react";
import { ConversationWithRelations } from "../db/extended-types";

const useFilterConversations = (
  conversations?: ConversationWithRelations[],
) => {
  const getCustomerConversations = React.useCallback(() => {
    const customerUsers = conversations
      ?.filter((conversation) => {
        const roles = conversation.userConversations[0].user?.roles?.flatMap(
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
        const roles = conversation.userConversations[0].user?.roles?.flatMap(
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
