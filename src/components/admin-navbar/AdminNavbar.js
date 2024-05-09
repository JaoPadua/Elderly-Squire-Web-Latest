import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import "./adminNavbar.css";

function AdminNavbar(){
    return(
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <div className="items">

                        {/*<div className="item">
                            <Button onClick={null}>
                            <SearchIcon  className="icons"/>
                            </Button>
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar
