import { useState, useEffect, useCallback } from "react";
import { getAllMembersForBoard } from "../api/boardApi";
import AddMemeberModal from "./AddMemberModal";
import "./BoardMembers.css";

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
        <div className="board-members-container">

            <div className="board-members-header">
                <h3>Board Members</h3>

                <button
                    className="add-member-btn"
                    onClick={() => setShowAddMemberModal(true)}
                >
                    + Add Member
                </button>
            </div>

            <div className="members-list">
                {boardMembers.length === 0 ? (
                    <p className="no-members">
                        No members
                    </p>
                ) : (
                    boardMembers.map((member) => (
                        <div
                            key={member.username}
                            className="member-card"
                        >
                            {member.username}
                        </div>
                    ))
                )}
            </div>

            {showAddMemberModal && (
                <AddMemeberModal 
                    boardId={boardId}
                    onClose={() => setShowAddMemberModal(false)}
                    onCreated={fetchBoardMembers}    
                />
            )}

        </div>
    )   
}

export default BoardMembers;