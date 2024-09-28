import { cn } from "@/lib/utils"

function MainContainer({children, className}) {
    return (
        <main className={cn("mt-[6rem] mb-3 lg:mt-[8rem] mx-[2%]", className)}>
            {children}
        </main>
    )
}

export { MainContainer } 