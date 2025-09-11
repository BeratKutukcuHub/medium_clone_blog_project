import { RiHome4Line } from "react-icons/ri";
import { RiHome4Fill } from "react-icons/ri";
import { RiFlag2Line } from "react-icons/ri";
import { RiFlag2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { MdOutlineAutoStories } from "react-icons/md";
import { MdAutoStories } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import "./layout.css"
import { useEffect, useRef } from "react";

export const Sidebar = ({sidebarMenu} : {sidebarMenu : boolean}) => {
    const sidebar = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        if(sidebarMenu){
            sidebar.current?.classList.remove("seccp");
            sidebar.current?.classList.add("secca");
        }
        else {
            sidebar.current?.classList.remove("secca");
            sidebar.current?.classList.add("seccp");
        }
    },[sidebarMenu]);
    const handleClick = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        const parent = target.parentElement?.parentElement as HTMLElement;
        const childs = parent.getElementsByClassName("sider");
        if(target.classList.contains("sider")) {
            Array.from(childs).forEach((child) => {
            const first = child.firstChild as HTMLElement;
            const second = child.childNodes[1] as HTMLElement;
            console.log(target.id);
            if(child.id === target.id){
                child.parentElement?.getElementsByClassName("sidel")[0].classList.add("sidela")
                first.classList.add("sideip");
                first.classList.remove("sideia");
                second.classList.add("sideia");
                second.classList.remove("sideip");
                second.style.opacity="1";
                child.getElementsByTagName("h3")[0].style.opacity = "1";
            }
            else {
                child.parentElement?.getElementsByClassName("sidel")[0].classList.remove("sidela")
                first.classList.add("sideia");
                first.classList.remove("sideip");
                second.classList.add("sideip");
                second.classList.remove("sideia");
                child.getElementsByTagName("h3")[0].style.opacity = "0.5";
                first.style.opacity="0.5";
            }
        })
        }
        
    }
    return (
        <section ref={sidebar} className="secc seccp" onClick={(e) => handleClick(e)}>
            <div style={{marginTop:"30px"}}></div>
            <div className="sidec " >
                <div className="sidel sidela" ></div>
                <div className="sider" id="0">
                    <RiHome4Line className="sideip"/>
                    <RiHome4Fill className="sideia" style={{opacity:"1"}}/>
                    <h3 style={{opacity:"1"}}>Home</h3>
                </div>
            </div>
            <div className="sidec">
                <div className="sidel"></div>
                <div className="sider"  id="1">
                    <RiFlag2Line className="sideia"/>
                    <RiFlag2Fill className="sideip"/>
                    <h3>Library</h3>
                </div>
            </div>
            <div className="sidec">
                <div className="sidel"></div>
                <div className="sider"   id="2">
                    <FaRegUser className="sideia"/>
                    <FaUser className="sideip"/>
                    <h3>Profile</h3>
                </div>
            </div>
            <div className="sidec">
                <div className="sidel"></div>
                <div className="sider"  id="3">
                    <MdOutlineAutoStories className="sideia"/>
                    <MdAutoStories className="sideip"/>
                    <h3>Stories</h3>
                </div>
            </div>
            <div className="sidec">
                <div className="sidel"></div>
                <div className="sider"  id="4">
                    <IoStatsChartOutline className="sideia"/>
                    <IoStatsChartSharp className="sideip"/>
                    <h3>Stats</h3>
                </div>
            </div>

            <div style={{width:"80%",borderTop:"1px solid rgba(235, 235, 235, 1)",marginTop:"30px",marginBottom:"30px",
                alignSelf:"center",justifySelf:"center"
            }}></div>
            
            <div className="sidec">
                <div className="sidel"></div>
                <div className="sider"  id="5">
                    <HiOutlineUsers className="sideia"/>
                    <HiMiniUsers className="sideip"/>
                    <h3>Following</h3>
                </div>
            </div>
            <div className="sidec">
                <div className="sidel"></div>
                <div className="d-flex gap-4 mt-2" style={{width:"240px"}}>
                    <FaRegUser style={{fontSize:"1rem",opacity:"0.6"}}/>
                    <div>
                        <h3 style={{fontSize:"0.8rem",width:"100%"}}>
                        Discover more writers and publications to follow.
                    </h3>
                    <span style={{textDecoration:"underline",fontSize:"0.9rem",width:"100%",textWrap:"nowrap"}}>See suggestions</span>
                    </div>
                </div>
            </div>
        </section>
    )
}



