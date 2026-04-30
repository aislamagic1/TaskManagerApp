import Header from "./Header";
import Sidebar from "./Sidebar";


function HomeComponent() {
    return(
        <div>
            <Header />
            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ flex: 1, padding: "1rem" }}>
                    <h1>Main Content</h1>
                </div>
            </div>
        </div>
    )
}

export default HomeComponent;