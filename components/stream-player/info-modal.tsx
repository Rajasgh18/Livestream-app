import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTrigger,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { Hint } from '../hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl
}: InfoModalProps) => {
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);
    const router = useRouter();

    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success("Stream updated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnail: null })
                .then(() => {
                    toast.success("Thumbnail Removed")
                    setThumbnailUrl("");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className='ml-auto'>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-14'>
                    <div className='space-y-2'>
                        <Label>Name</Label>
                        <Input placeholder='Stream name' onChange={e => setName(e.target.value)} disabled={isPending} />
                    </div>
                    <div className='space-y-2'>
                        <Label>Thumbnail</Label>
                        {thumbnailUrl
                            ? (
                                <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                                    <div className='absolute top-2 right-2 z-[10]'>
                                        <Hint label="Remove thumbnail" side='left' asChild>
                                            <Button type='button' disabled={isPending} onClick={onRemove} className='w-auto h-auto p-1.5'>
                                                <Trash className='w-4 h-4' />
                                            </Button>
                                        </Hint>
                                    </div>
                                    <Image src={thumbnailUrl} alt='Thumbnail' fill className='object-cover' />
                                </div>
                            )
                            : (
                                <div className='rounded-xl border border-white'>
                                    <UploadDropzone
                                        endpoint="thumbnailUploader"
                                        appearance={{
                                            label: { color: "#FFF" },
                                            allowedContent: { color: "#FFF" }
                                        }}
                                        onClientUploadComplete={res => {
                                            setThumbnailUrl(res?.[0]?.url);
                                            router.refresh();
                                            closeRef.current?.click();
                                        }}
                                    />
                                </div>
                            )}
                    </div>
                    <div className='flex justify-between'>
                        <DialogClose ref={closeRef} asChild>
                            <Button type='button' variant="destructive">Cancel</Button>
                        </DialogClose>
                        <Button disabled={isPending} variant="primary" type='submit'>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}
