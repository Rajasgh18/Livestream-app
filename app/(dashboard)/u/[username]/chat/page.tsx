import { getSelf } from "@/lib/auth-services";
import { getStreamByUserId } from "@/lib/stream-services";
import { ToggleCard } from "./_component/toggle-card";

const ChatPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if (!stream) throw new Error("Stream not found")

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Chat Settings</h1>
            </div>
            <div className="space-y-4">
                <ToggleCard label="Enable Chat" field="isChatEnabled" value={stream.isChatEnabled}/>
                <ToggleCard label="Delay Chat" field="isChatDelayed" value={stream.isChatDelayed}/>
                <ToggleCard label="Must be following to chat" field="isChatFollowersOnly" value={stream.isChatFollowersOnly}/>
            </div>
        </div>
    );
};

export default ChatPage;