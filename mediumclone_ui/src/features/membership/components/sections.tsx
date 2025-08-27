import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
export const Sections = ({index}:{index : number}) => {
    const description : string[] = [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eligendi",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est nihil deserunt magnam. Dicta, aut omnis!",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere commodi culpa necessitatibus.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis harum voluptate ab placeat sunt. Vitae adipisci qui quaerat."
    ];
    interface SectionRightSideHandler {
        userPhotos : {
            heroPhoto : string,
            userPhoto : string
        },
        userDetail : {
            desc : string,
            userName : string,
            job : string
        }
    }
    const userNameAndJob  = [
        {
            description : description[0],
            userName: "Wick Wick Jhonny",
            job : "Software Developer"
        },
        {
            description : description[1],
            userName: "Caprio di Leonardo",
            job : "Business Analyst"
        },
        {
            description : description[2],
            userName: "Bihanna",
            job : "Women's Football Team Captain"
        },
        {
            description : description[3],
            userName: "Henry Thery",
            job : "Boxer, Thoughtful and Passionate"
        }];

    const path = (pathName : number) => 
        `url(images/mediumclone_membership${pathName.toString()+".png"})`;
    const profilepath = (pathName : number)=> 
        `images/mediumclone_membershipu${pathName.toString()+".png"}`;
    const [indis, setIndis] = useState(1);
    const [linear, setLinear] = useState(`linear-gradient(to top, rgba(158, 156, 154, 0.6), rgba(205, 152, 72, 0.07))`);
    const [desc, setDesc] = useState<SectionRightSideHandler>({
        userPhotos : {
            heroPhoto : path(indis),
            userPhoto : path(indis)
        },
        userDetail : {
            desc : description[indis-1==-1?0 : indis-1],
            job : userNameAndJob[indis-1==-1?0 : indis-1].job,
            userName : userNameAndJob[indis-1==-1?0 : indis-1].userName
        }
    });
    const [fade, setFade] = useState(false);
    useEffect(() => {
      const sideEffect = setTimeout(() => {
        setFade(false);
      }, 100);
      setIndis(prev => prev === 4 ? 1 : index);
      setFade(true)
      return () => clearInterval(sideEffect);
}, [index]);

useEffect(() => {
  setDesc({
    userPhotos: {
      heroPhoto: path(indis),
      userPhoto: profilepath(indis)
    },
    userDetail: {
      desc: description[indis - 1],
      job: userNameAndJob[indis - 1].job,
      userName: userNameAndJob[indis - 1].userName
    }
  });

  switch(indis) {
    case 1:
      setLinear(`linear-gradient(to top, rgba(65, 49, 130, 0.6), rgba(45, 51, 211, 0.07))`);
      break;
    case 2:
      setLinear(`linear-gradient(to top, rgba(191, 118, 59, 0.6), rgba(233, 131, 21, 0.07))`);
      break;
    case 3:
      setLinear(`linear-gradient(to top, rgba(75, 180, 29, 0.6), rgba(76, 250, 49, 0.07))`);
      break;
    case 4:
      setLinear(`linear-gradient(to top, rgba(228, 89, 191, 0.6), rgba(255, 254, 254, 0.05))`);
      break;
  }
}, [indis]);

    return (
        <>
        <div className={` position-relative secf slide ${fade?"slideop" : ""} `}
        style={{backgroundImage:`${desc.userPhotos.heroPhoto}`,backgroundRepeat:"no-repeat",backgroundSize:"cover",
        minHeight:"300px",zIndex:"auto"}}>
        <button className="secsb "style={{zIndex:"1"}}><FaStar/> Member-only story</button>
        
        <div className="hr m-0 p-0 border-white opacity-50"></div>
        </div>
        
                        
        <div className={`position-relative z-3 d-flex flex-column align-items-center justify-content-start slide
        secs ${fade?"slideop":""}`}
            >
                <div className="z-n1 position-absolute bgcolor" style={{
            background:`${linear}`,
            height:"500px",
            width:"100%",
            right:0,
            zIndex:"100",
            bottom:"0",
            pointerEvents: "none"
        }}></div>
            <h2 className="secst mt-4 mrl">{desc.userDetail.desc}</h2>
            <div className="d-flex justify-content-start align-items-start gap-4 w-100" 
            style={{marginTop:"60px",marginBottom:"40px"}}>
                <span className="mrl" style={{width:"40px", height:"40px",
                     position:"relative"}}>
                        <img  
                        style={{position:"absolute", left:"0"
                            ,top:0,width:"100%",height:"100%"
                        }} src={desc.userPhotos.userPhoto} alt="" />
                </span>
                <h3 className="secsd d-flex flex-column justify-content-start align-items-start">
                    <span className="secsdt ">{desc.userDetail.userName}</span>
                    <span className="secsdf ">{desc.userDetail.job}</span>
                </h3>
            </div>
        </div>
        </>
    );
}