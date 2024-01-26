import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  console.log({ params });

  const conversation = useMemo(() => {
    if (!params?.conversation) {
      return "";
    }

    return params.conversation as string;
  }, [params?.conversation]);

  const isOpen = useMemo(() => !!conversation, [conversation]);

  return useMemo(() => ({ isOpen, conversation }), [isOpen, conversation]);
};

export default useConversation;
