import { MainContainer } from "@/components/MainContainer"
import { TopMenu } from "@/components/TopMenu"

function Dashboard() {

    return (
        <>
            <TopMenu />

            <MainContainer>
                <h1>Dashboard</h1>
            </MainContainer>
        </>
    )
}

export { Dashboard }