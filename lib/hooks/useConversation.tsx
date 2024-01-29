import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return 0;
    }

    return parseInt(params.conversationId as string, 10);
  }, [params?.conversationId]);

  const isChatSideBarOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({ isChatSideBarOpen, conversationId }),
    [isChatSideBarOpen, conversationId],
  );
};

export default useConversation;
