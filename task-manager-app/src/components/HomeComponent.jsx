import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import TaskComponent from "./TaskComponent";
import BoardMembers from "./BoardMembers";
import "./HomeComponent.css"


function HomeComponent() {

    const { boardId } = useParams();

    return(
        <div>
            <Header />
            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ flex: 1, padding: "1rem" }}>
                    {!boardId ? (
                        <div className="empty-board-message">
                            <h1>Select or Create a New Board</h1>
                        </div>
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