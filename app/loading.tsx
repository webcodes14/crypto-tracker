import Skeleton from "./components/Skeleton"


const Loading = () => {

    return (
        <>
            <h2><Skeleton className="h-16 w-full mb-4" /></h2>
            <div className="grid grid-cols-2 gap-10">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </>
        
    )
}

export default Loading;