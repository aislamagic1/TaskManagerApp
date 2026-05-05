import { useState, useEffect, useCallback } from "react";
import { getAllMembersForBoard } from "../api/boardApi";

function BoardMembers({ boardId }) {

    const [boardMembers, setBoardMembers] = useState([]);

    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    const fetchBoardMembers = useCallback(async () =>{
        try {
            const response = await getAllMembersForBoard(boardId);
            setBoardMembers(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [boardId]);

    useEffect(() => {
        if (!boardId) return;
        fetchBoardMembers();
    }, [fetchBoardMembers, boardId]);

    return(
        <div className="board-mebmers">
            <p>Board members:</p>
                {boardMembers.map((member) => (
                    <p key={member.username}>{member.username}</p>
                ))}
            <button className="task-btn"
                onClick={() => setShowAddMemberModal(true)}>
                Add member
            </button>
            
            {showAddMemberModal && (
                <div className="modal" >
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add member to board</h3>

                        

                    <div className="modal-buttons">
                        <button className="create-btn" 
                            >
                            Add Member
                        </button>
                        <button className="cancel-btn" 
                                >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            )}

        </div>
    )
}

export default BoardMembers;