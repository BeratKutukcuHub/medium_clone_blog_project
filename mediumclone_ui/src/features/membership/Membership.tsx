import { useContext, useEffect, useState } from "react";
import { Sections } from "./components/sections";
import { FaStar } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { BsBalloonHeart } from "react-icons/bs";
import "./mermbership.css";
import { Signup } from "../../shared/components/Signup";
import { Signin } from "../../shared/components/Signin";
import { SignupContext } from "../../shared/hooks/SignupContext";
import { SigninContext } from "../../shared/hooks/SigninContext";

export const Membership = () => {
    const {isPop, setPop} = useContext(SignupContext);
    const {isPopin , setPopin, setContent, content} = useContext(SigninContext);
    setContent("Welcome back.");
    
    const classNameBottomSection : string = 
    "d-flex flex-column align-items-start justify-content-center p-5 bsmrl bsc gap-2";
    const linearList : string[] = [
        "rgba(10, 34, 215, 0.10)",
        "rgba(158, 112, 14, 0.10)",
        "rgba(62, 158, 14, 0.10)",
        "rgba(153, 14, 158, 0.10)"
    ]
    const [index , setIndex] = useState(1);
    const [linear , setLinear] = useState("rgba(14, 31, 158, 0.4)");

    useEffect(() => {
    const bgLinear = setInterval(() => {
    setIndex(prev => {
      const next = prev === 4 ? 1 : prev + 1; 
      setLinear(linearList[next - 1]);        
      return next;
    });
    }, 3000);

    return () => clearInterval(bgLinear);
    }, []); 
    return (
        <>
            {isPop? <Signup popState={isPop} handlePopSwitch={setPop}/> : ""}
            {isPopin? <Signin isPopin={isPopin} setPopin={setPopin} content={content}/> : ""}
            <nav className="w-100 position-fixed bg-white" style={{zIndex:"9999"}}>
                <div className="d-flex justify-content-between nc">
                    <h1 className="nt">Medium</h1>
                    <div className="ng">
                        <button className="nb lnb" onClick={()=> setPopin(true)}>Sign in</button>
                        <button className="nb rnb" onClick={()=> setPop(true)}>Sign up</button>
                    </div>
                </div>
                <div className="hr"></div>
            </nav>

            <section className="sc container-fluid overflow-hidden bgw" style={{backgroundColor:`${linear}`,height:"auto",paddingTop:"80px"}}>
                <div className="row" style={{}}>
                    <div className={`col-xl-8 col-lg-7 col-md-6 tb slide `} style={{paddingBottom:"50px"}}>
                        <h2 className="sml smt">
                            Support human stories
                        </h2>
                        <h5 className="w-50 opacity-75 smlh sml tb" style={{marginTop:"235px"}}>
                            Become a member to read without limits or ads, fund great writers,
                             and join a global community of people who care about high-quality storytelling.
                        </h5>
                        <div className="d-flex w-100 gap-3 align-items-center sml mt-5">
                            <button className="rounded-5 sbb bb bn text-white" style={{marginRight:"20px"}}>
                                Get started</button>
                            <button className="rounded-5 sbb bw tb border-1 border-black">View plans</button>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-6  d-flex flex-column hrl" style={{paddingRight:"0px",paddingLeft:"0px"}}>
                    <Sections index={index}/>
                    </div>
                </div>
            </section>
            <div style={{borderTop:"1px solid black"}}></div>
            <section className="container-fluid " style={{marginTop:"30px"}}>
                
                <div className="row">
                    <div className="col-lg-5  secti">
                        <h1 className="sectiw"  style={{fontSize:"3.5rem",fontWeight:"400",
                            letterSpacing:"-2px", wordSpacing:"-1px", position:"sticky",
                            top:"80px"}}>Why membership?</h1>
                    </div>
                    <div className="col-lg-7">
                        <div className={`${classNameBottomSection} `}>
                            
                            <h2 style={{fontSize:"2.5rem",fontWeight:"400"}}>Reward writers</h2>
                            <h4 >Your membership directly supports the writers, editors, curators,
                and teams who make Medium a vibrant, inclusive home for human stories.
                A portion of your membership is allocated to the writers of the stories you
                 read and interact with.</h4>
                                </div>
                <div className={`${classNameBottomSection} `}>
                <h2 style={{fontSize:"2.5rem",fontWeight:"400"}}>Unlock every story</h2>
                <h4 >Get access to millions of original stories that spark bright 
                    ideas, answer big questions, and fuel bold ambitions.</h4>
                </div>

                <div className={`${classNameBottomSection}`}>
                <h2 style={{fontSize:"2.5rem",fontWeight:"400"}}>Enhance your reading experience</h2>
                <h4 >Immerse yourself in audio stories, read offline wherever you go,
                and connect with the Medium community on Mastodon.</h4>
                </div>

                <div className={`${classNameBottomSection}`}>
                    <h2 style={{fontSize:"2.5rem",fontWeight:"400"}}>Elevate your writing</h2>
                    <h4 >
                        Create and contribute to publications to collaborate with other writers,
                    create a custom domain for your profile, and level up your writing with our
                    simple but powerful publishing tools.
                    </h4>
                </div>

        <div className={`${classNameBottomSection}`}>
        <h2 style={{fontSize:"2.5rem",fontWeight:"400"}}>Support a mission that matters</h2>
        <h4 >Members are creating a world where original,
            human-crafted stories thrive. As a member-supported platform,
            quality comes first, not ads or clickbait.</h4>
        </div>
                    </div>
                    <div style={{borderTop:"1px solid black", paddingBottom:"20px"}}></div>
                </div>
                
            </section>
            
            <section className="container-fluid" style={{marginTop:"30px"}}>
                <div className="row">
                    <div className="col-lg-5 secti">
                        <h1 className="sectiw"  style={{fontSize:"3.5rem",fontWeight:"400",
                            letterSpacing:"-2px", wordSpacing:"-1px", position:"sticky",
                            top:"80px"}}>What members are saying?</h1>
                    </div>
                    <div className="col-lg-7 secc">
                        <div className="d-flex sec">
                            <div style={{flexBasis:"25%"}}>
                                <div className="seci" style={{width:"80px",height:"80px",borderRadius:"50%",marginTop:"25%",marginLeft:"25%"
                                ,backgroundImage:`url(public/images/profile1.jpg)`
                                ,backgroundSize:"cover"
                                }}></div>
                            </div>
                            <div className=" d-flex flex-column align-items-start justify-content-center"
                            style={{flexBasis:"75%"}}>
                            <h3 className="secd" style={{fontSize:"1.5rem",fontWeight:"200",letterSpacing:"-1.5px",
                                lineHeight:"30px",wordSpacing:"2px",marginTop:"40px"}}>The easy path in social 
                                media is promoting the worst content,
                             the cheapest, tackiest, lowest-effort stuff. That’s not what you get on Medium.
                              You can actually find content you can build your brain with.
                             I appreciate that, both as a reader and a writer.</h3>
                            <h5 style={{fontSize:"1rem", fontWeight:"500",marginTop:"15px"}}>Cassie Kozyrkov,
                                 Chief Decision Scientist at Google and Medium member</h5>
                        </div>
                    </div>
                        
                    <div className="d-flex sec">
                            <div style={{flexBasis:"25%"}}>
                                <div className="seci" style={{width:"80px",height:"80px",borderRadius:"50%",marginTop:"25%",marginLeft:"25%"
                                ,backgroundImage:`url(public/images/profile2.jpg)`
                                ,backgroundSize:"cover"
                                }}></div>
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-center"
                            style={{flexBasis:"75%"}}>
                            <h3 className="secd" style={{fontSize:"1.5rem",fontWeight:"200",letterSpacing:"-1.5px",
                                lineHeight:"30px",wordSpacing:"2px",marginTop:"40px"}}>
                            Medium has proved a game-changer 
                            for me, and quickly became the subscription I value the most, and I have quite a few.
                            The cost is nothing compared to the value Medium generates for me month after month.</h3>
                            <h5 style={{fontSize:"1rem", fontWeight:"500",marginTop:"15px"}}>Enrique Dans,
                                 Professor of Innovation at IE Business School and Medium member</h5>
                        </div>
                    </div>
                        
                    <div className="d-flex sec">
                            <div style={{flexBasis:"25%"}}>
                                <div className="seci" style={{width:"80px",height:"80px",borderRadius:"50%",marginTop:"25%",marginLeft:"25%"
                                ,backgroundImage:`url(public/images/profile3.jpg)`
                                ,backgroundSize:"cover"
                                }}></div>
                            </div>
                            <div className="d-flex flex-column align-items-start justify-content-center"
                            style={{flexBasis:"75%"}}>
                            <h3 className="secd" style={{fontSize:"1.5rem",fontWeight:"200",letterSpacing:"-1.5px",
                                lineHeight:"30px",wordSpacing:"2px",marginTop:"40px"}}>For us tech folks, Medium membership unlocks
                                 a whole treasure trove of high-quality articles. One good technology book could sell
                                  for over the Medium membership fee amount. It’s your choice whether to buy one book,
                                   or buy hundreds and thousands of books by unlocking member-only reading on Medium.
                                 Investing in a Medium membership is one of the best investments I have ever made for
                                  my career.</h3>
                            <h5 style={{fontSize:"1rem", fontWeight:"500",marginTop:"15px"}}>Wenqi Glantz, 
                                Software Architect at ArisGlobal and Medium member</h5>
                        </div>
                    </div>

                    </div>
                </div>
            </section>
            <div style={{width:"100%", borderTop:"1px solid black", margin:"50px 0px"}}></div>
            <section className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 secti">
                        <h1 className="sectiw"  style={{fontSize:"3.5rem",fontWeight:"400",
                            letterSpacing:"-2px", wordSpacing:"-1px", position:"sticky",
                            top:"80px"}}>Membership plans</h1>
                    </div>
                    <div className="col-lg-7">
                            <div className="row h-auto">
                                <div className="col-lg-4 col-5 d-flex flex-column 
                                justify-content-start
                                 align-items-center" style={{marginLeft:"auto",height:"auto", border:"1px solid rgba(173, 173, 173, 0.53)", 
                                    borderRadius:"8px",marginRight:"20px",gap:"20px"}}>
                                        <FaStar style={{fontSize:"30px",marginTop:"30px"}}/>
                                        <div className="d-flex flex-column justify-content-center align-items-center w-100">
                                            <h4 style={{wordSpacing:"-2px",letterSpacing:"-1px"}}>Medium Member</h4>
                                            <h6 style={{fontWeight:"400"}}>$5/month or $50/year</h6>
                                            <button style={{width:"95%",borderRadius:"25px",height:"35px",
                                                backgroundColor:"#1A8917",
                                                border:"none",
                                                color:"white",
                                                margin:"15px 0px"
                                            }}
                                            >Get started</button>
                                            <hr style={{width:"100%",opacity:"0.10"}}/>
                                            
                                            <div className="d-flex flex-column justify-content-center" style={{
                                                gap:"23px"
                                            }}>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Read member-only stories</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Support writers you read most</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center ">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Earn money for your writing</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Listen to audio narrations</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Read offline with the Medium app</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Access our Mastodon community</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Connect your custom domain</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center ">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Create your own publications</h6>
                                            </div>
                                            <div className="mb-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                <div className="col-lg-4 col-5 d-flex flex-column 
                                justify-content-start
                                 align-items-center" style={{height:"auto", border:"1px solid rgba(173, 173, 173, 0.43)", 
                                    borderRadius:"8px",marginRight:"auto",gap:"20px"}}>
                                        <BsBalloonHeart style={{fontSize:"30px",marginTop:"30px"}}/>
                                        <div className="d-flex flex-column justify-content-center align-items-center w-100">
                                            <h4 style={{wordSpacing:"-2px",letterSpacing:"-1px"}}>Friend of Medium</h4>
                                            <h6 style={{fontWeight:"400"}}>$15/month or $150/year</h6>
                                            <button style={{width:"95%",borderRadius:"25px",height:"35px",
                                                backgroundColor:"#1A8917",
                                                border:"none",
                                                color:"white",
                                                margin:"15px 0px"
                                            }}
                                            >Get started</button>
                                            <hr style={{width:"100%",opacity:"0.10"}}/>
                                            
                                            <div className="d-flex flex-column justify-content-center" style={{
                                                gap:"23px"
                                            }}>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FaStar style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>All Medium member benefits</h6>
                                            </div>
                                            <div className="text-center">PLUS</div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.9rem",fontWeight:"500",marginBottom:"0px"}}>Give 4x more to the writers you read</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center ">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Share member-only stories with anyone 
                                                    and drive more earnings for writers</h6>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center">
                                                <FcOk style={{marginLeft:"10px",marginRight:"10px"}}/>
                                                <h6 style={{fontSize:"0.8rem",fontWeight:"400",marginBottom:"0px"}}>Customize app icon</h6>
                                            </div>
                                            
                                            <div className="mb-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                <div className="col-4"></div>
                            </div>
                    </div>
                </div>
            </section>
            <div style={{borderTop:"1px solid black",width:"100%",
                margin:"50px 0px 0px 0px"
            }}></div>
            <section style={{height:"300px", display:"flex",justifyContent:"center",alignItems:"center", 
                background:`${linear}`}}>
                <div className="d-flex flex-column align-items-center justify-content-center gap-4">
                    <h1 className="lst" style={{fontSize:"3.95rem",fontWeight:"400",letterSpacing:"-2px"}}>Unlock a world of wisdom</h1>
                    <button style={{width:"120px",height:"40px",border:"none"}} 
                    className="bg-dark rounded-5 text-white">Get started</button>
                </div>
            </section>
            
            <footer className="d-flex justify-content-center w-100 ng" style={{borderTop:"1px solid black", height:"86.5px"
            }}>
                <div className="d-flex justify-content-between align-items-center" style={{width:"100%"}}>
                    <div>
                    <h4 className="nt">Medium</h4>
                    </div>
                <div className="d-flex justify-content-center gap-2" style={{marginTop:"10px"}}>
                    <h6 style={{fontSize:"0.8rem",opacity:"0.85", textDecoration:"underline",cursor:"pointer"}}></h6>
                    <h6 style={{fontSize:"0.8rem",opacity:"0.85", textDecoration:"underline",cursor:"pointer"}}>Terms</h6>
                    <h6 style={{fontSize:"0.8rem",opacity:"0.85", textDecoration:"underline",cursor:"pointer"}}>Privacy</h6>
                    <h6 style={{fontSize:"0.8rem",opacity:"0.85", textDecoration:"underline",cursor:"pointer"}}>Help</h6>
                    <h6 style={{fontSize:"0.8rem",opacity:"0.85", textDecoration:"underline",cursor:"pointer"}}>Teams</h6>
                    <h6 style={{fontSize:"0.8rem",opacity:"0.85", textDecoration:"underline",cursor:"pointer",marginRight:"30px"}}>Press</h6>
                </div>
                </div>
            </footer>
        </>
    );
}