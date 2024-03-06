import { getStreams } from "@/lib/feed-services";
import { ResultCard, ResultCardSkeleton } from "./result-card";


export const Results = async () => {
    const data = await getStreams();

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Streams we think you'll like</h2>
            {data.length === 0 && (
                <div className="text-muted-foreground text-sm">
                    No streams found
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data.map(result => (
                    <div key={result.id}>
                        <ResultCard data={result} />
                    </div>
                ))}
            </div>
        </div>
    );
    ;
}

export const ResultsSkeleton = () => {
    return (
        <div className="h-8 w-[290px] mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[...Array(4)].map((_, i) => (
                    <ResultCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};