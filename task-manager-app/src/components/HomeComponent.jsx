import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import TaskComponent from "./TaskComponent";


function HomeComponent() {

    const { boardId } = useParams();

    return(
        <div>
            <Header />
            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ flex: 1, padding: "1rem" }}>
                    {!boardId ? (
                        <h1>Select a board</h1>
                    ):(
                        <TaskComponent boardId={boardId} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeComponent;