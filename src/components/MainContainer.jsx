import { cn } from "@/lib/utils"

function MainContainer({children, className}) {
    return (
        <main className={cn("mt-[6rem] lg:mt-[8rem] mx-[2%] border border-red-700 h-[100vh]", className)}>
            {children}
        </main>
    )
}

export { MainContainer } 