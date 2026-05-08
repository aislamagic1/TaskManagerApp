import { useState, useEffect } from "react";
import { getUserByUsername } from "../api/userApi";
import { addMemberToBoard } from "../api/boardApi";
import "./CreateModal.css"


function AddMemeberModule( {boardId, onClose, onCreated} ){

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch(value){
        setSearch(value);
        setError("");
    
        if(!value){
            setSearchResults([]);
            return;
        }

        try {
            setLoading(true);
            const response = await getUserByUsername(value);
            if(response.data.length !== 0)
                setSearchResults(response.data);
            else
                console.log("ne vallja");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }   
    }
    
    async function handleAddMember(){
        setError("");
        const userExists = searchResults.some(
            user => user.user_name === search
        );

        if(searchResults.length === 0 || !userExists){
            setError("User not found");
            return;
        }
        
        try {
            await addMemberToBoard(boardId, searchResults[0].id);
            onClose();
            onCreated();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            if (search) handleSearch(search);
        }, 300);

        return () => clearTimeout(delay);
    }, [search]);

    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Add member to board</h3>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    placeholder="Search by username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {loading && <p>Searching...</p>}

                <div className="modal-buttons">
                    <button className="create-btn" 
                            onClick={handleAddMember}>
                        Add Member
                    </button>
                    <button className="cancel-btn" 
                            onClick={onClose}>
                        Cancel
                   </button>
                </div>
            </div>
        </div>
    )
}

export default AddMemeberModule;