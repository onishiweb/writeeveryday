export const Prompt = ({ dayNumber, prompt }: { dayNumber: number, prompt: string }) => {
    return (
        <>  
            <h1 className="text-lg font-normal -mt-4 mb-4">Day {dayNumber}</h1>
        
            <p className="text-2xl md:text-4xl font-medium tracking-wide text-center max-w-[260px] md:max-w-xl">
                {prompt}
            </p>
        </>
    );
};