import { useState } from "react"
import { Navbar } from "../../shared/layout/Navbar"
import { Sidebar } from "../../shared/layout/Sidebar"
import { RSidebar } from "../../shared/layout/RSidebar";
import "./medium.css"
import { PostList } from "./components/PostList";
export const Medium = () => {
    const [isClick, setClick] = useState<boolean>(false);
    
    const stylesActive = ["1 1 auto", "0 0 20%"];
    const stylesPassive = ["1 1 auto", "0 0 25%"];
    const isClicked = (state : boolean) => setClick(state);
    return <div style={{height:"auto",margin:"0",padding:"0",boxSizing:"border-box"}}>
    <Navbar handleClick={isClicked}/>
    
    <div style={{display:"flex",width:"100%",paddingTop:"60px",transition:"all 0.7s ease"}}>
        <div style={{height:"100%",position:"fixed",width:"240px"
    }}>
        <Sidebar sidebarMenu={isClick}/>
    </div>
        <div style={{marginLeft:isClick?"370px":"190px",flex:isClick?stylesActive[0]:stylesPassive[0],
            transition:"all 0.7s ease"
        }}>
    <main style={{marginTop:"35px",display:"flex", width:"100%",flexDirection:"column"}}>
    <div>
        <div className="abbar d-flex gap-3" style={{width:"75%",alignSelf:"center",position:"relative"}}>
            <div className="abbari position-relative">
                <h6 >Senin İçin</h6>
                <div className="b"></div>
            </div>
            <div className="abbari position-relative">
                <h6 >Öne Çıkanlar</h6>
                <div className="b"></div>
            </div>
            <div style={{position:"absolute",width:"100%",bottom:"0", borderTop:"1px solid rgba(238, 238, 238, 1)"}}></div>
        </div>
        
        
        <section style={{marginTop:"30px"}}></section>
    </div>
    </main>
        </div>
        <div className="sbar" style={{flex:isClick?stylesActive[1]:stylesPassive[1]
            ,borderLeft:"1px solid rgba(240, 240, 240, 1)",transition:"all 0.7s ease"
    }}>
        <RSidebar/>
    </div>
    </div>
    
        <div style={{marginLeft:isClick?"280px":"10px",transition:"all 0.7s"}}>
            <PostList/>
        </div>
    </div>
}