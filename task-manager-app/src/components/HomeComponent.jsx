import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import TaskComponent from "./TaskComponent";
import BoardMembers from "./BoardMembers";


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
                        <div>
                            <TaskComponent boardId={boardId} />
                            <BoardMembers boardId={boardId} />
                        </div>                 
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeComponent;