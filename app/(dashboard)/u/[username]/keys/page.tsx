import { Button } from '@/components/ui/button'
import { UrlCard } from './_component/url-card';
import { KeyCard } from './_component/key-card';
import { getSelf } from '@/lib/auth-services';
import { getStreamByUserId } from '@/lib/stream-services';
import { ConnectModal } from './_component/connect-modal';

const KeysPage = async () => {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if (!stream) throw new Error("Stream not found");

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold'>Keys & URLs</h1>
                <ConnectModal />
            </div>
            <div className='space-y-4'>
                <UrlCard value={stream.serverUrl} />
                <KeyCard value={stream.streamKey} />
            </div>
        </div>
    );
};

export default KeysPage;