import Skeleton from "./components/Skeleton";

const Loading = () => (
    <div aria-busy="true" aria-label="Načítání tržních dat" className="space-y-8">
        <section className="rounded-[2rem] bg-[#10251e] p-8 sm:p-12">
            <Skeleton className="h-5 w-36 bg-white/15" />
            <Skeleton className="mt-6 h-12 w-3/4 bg-white/15" />
            <Skeleton className="mt-3 h-5 w-2/3 bg-white/15" />
        </section>
        <section className="space-y-3">
            <Skeleton className="h-12 w-full" />
            {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} className="h-24 w-full" />
            ))}
        </section>
    </div>
);

export default Loading;
