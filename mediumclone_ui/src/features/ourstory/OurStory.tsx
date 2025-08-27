import { GoArrowRight } from "react-icons/go";
import "./ourstory.css"

export const OurStory = () => {
        
    return (
            <div className="w-100 h-100 d-flex flex-column position-relative z-3 c">
                <img src="images/mediumclone_ourstory.webp" className="position-absolute w-100 h-100 z-n1 bci"/>
                <nav className="nc d-flex align-items-center justify-content-between ">
                    <h1 className="text-white nt">Medium</h1>
                    <div className="ng">
                        <button className="ngb bgc text-white">Sign in</button>
                        <button className="ngb nbb cc">Sign up</button>
                    </div>
                </nav>
                <div className="hr"></div>
                <section className="sc h-auto w-100">
                    <div className="sd d-flex flex-column justify-content-center gap-4">
                        <div className="sdt text-white mb-5 mw">
                            <h1>Everyone has a story to tell</h1>
                        </div>
                        <h3 className="st text-white mw">Medium is a home for human stories and ideas. Here,
                             anyone can share knowledge and wisdom with the world—without having to build
                              a mailing list or a following first. The internet is noisy and chaotic; Medium is quiet yet full of insight. It’s simple, beautiful,
                             collaborative, and helps you find the right readers for whatever you have to say.</h3>
                        <h4 className="s mw"><span className="stc">Ultimately, our goal is to deepen our
                             collective understanding of the world through the power of writing</span></h4>
                        <h3 className="st text-white mw">
                            We believe that what you read and write matters. Words can divide or 
                            empower us, inspire or discourage us. In a world where the most sensational 
                            and surface-level stories often win, we’re building a system that rewards depth, nuance, and time well spent.
                             A space for thoughtful conversation more than drive-by takes, and substance over packaging.
                        </h3>
                        <h3 className="st text-white mw">Over 100 million people connect and share their wisdom on Medium every month.
                             They’re software developers, amateur novelists, product designers, CEOs,
                              and anyone burning with a story they need to get out into the world. They write about
                               what they’re working on, what’s keeping them up at night, what they’ve lived through,
                             and what they’ve learned that the rest of us might want to know too.</h3>
                        <h3 className="st text-white mw">Instead of selling ads or selling your data, we’re supported by
                             a growing community of over a million <span className="text-decoration-underline">Medium members</span> who believe in our mission.
                              If you’re new here, start reading. Dive deeper into whatever matters to you.
                               Find a post that helps you 
                            learn something new, or reconsider something familiar—and then <span className="text-decoration-underline">
                                write your story.</span></h3>
                    </div>
                </section>
                <div className="sg d-flex flex-column w-100 align-items-center">
                    <div className="hr mt-5"></div>
                    <section className="si text-white">
                        <h1>Start reading</h1>
                        <GoArrowRight className="sic"/>
                    </section>
                    <div className="hr"></div>
                    <section className="si text-white">
                        <h1>Start writing</h1>
                        <GoArrowRight className="sic"/>
                    </section>
                    <div className="hr"></div>
                        <section className="si text-white">
                        <h1>Become a member</h1>
                        <GoArrowRight className="sic"/>
                    </section>
                    
                </div>
            </div>
    );
}