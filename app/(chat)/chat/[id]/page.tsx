import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import { Chat } from "@/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";
import { getChatById, getMessagesByChatId, getModelForChat } from "@/lib/db/queries";
import { convertToUIMessages } from "@/lib/utils";
import { DataStreamHandler } from "@/components/data-stream-handler";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });

  if (!chat || chat.isDeleted) {
    notFound();
  }

  const session = await auth();

  if (chat.visibility === "private") {
    if (!session || !session.user) {
      return notFound();
    }

    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }
  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  const cookieStore = await cookies();
  // const modelIdFromCookie = cookieStore.get("model-id")?.value;
  const selectedModelId = await getModelForChat(id);
  
    // models.find((model) => model.id === modelIdFromCookie)?.id ||
    // DEFAULT_MODEL_NAME;

  return (
    <>
      <Chat
        id={chat.id}
        initialMessages={convertToUIMessages(messagesFromDb)}
        selectedModelId={selectedModelId}
        selectedVisibilityType={chat.visibility}
        isReadonly={session?.user?.id !== chat.userId}
        user={session?.user}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
