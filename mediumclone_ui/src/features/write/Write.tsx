import { EditorContent, Editor } from "@tiptap/react";
import React, { useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { PiProhibitThin } from "react-icons/pi";
import { WriteNavbar } from "./components/navbar.tsx";
import { VscDebugRestart } from "react-icons/vsc";
import "./write.css";
import { useAddPostMutation } from "../../app/services/PostService.ts";
import tagPool from "./tagPool.json"; 
import type { User } from "../../app/services/AuthService.ts";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.ts";
import { useNavigate } from "react-router-dom";
type SelectionCoords = {
  top: number;
  left: number;
  editorType: "title" | "content";
};

export const Write = ({ editor, titleEditor }: { editor: Editor; titleEditor: Editor }) => {
  const navigate = useNavigate();
  const [titleContent , setTitleContent] = useState<string>("");
  const [post,{isSuccess}] = useAddPostMutation();
  const userInfo = useSelector((state: RootState) => state.user);
  const [detectedTags , setDetectedTags] = useState<string[]>([]);
  const [isUnplash, setUnplash] = useState(false);
  const [content , setContent] = useState<string>("");
  const [isPublish, setIsPublish] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState<SelectionCoords | null>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInputCoords, setLinkInputCoords] = useState({ top: 0, left: 0 });
  const [linkUrl, setLinkUrl] = useState("");
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const eccRef = useRef<HTMLDivElement | null>(null);
  const activeEditorRef = useRef<Editor | null>(null);
  
  interface TagCount {
  [tag: string]: number;
}
console
.log(titleContent,content)
  const handlePublishBase = async () : Promise<void> => {
    if(!userInfo.user)return;
    console.log(userInfo.user);
      await post({
      title : titleContent,
      description : content,
      UserId : userInfo.user.id,
      Categories : detectedTags
    }).unwrap();
  }
  useEffect(()=>{
    if(!isSuccess)return;
    setIsPublish(true);
    return () => setIsPublish(false);
  },[isSuccess]);

  useEffect(()=>{
    if(!isPublish)return;
    if(isSuccess)
    setIsPublish(false);
    navigate("/medium");
  },[isPublish,navigate,isSuccess]);
  const getTopTags = (title: string, content: string, topN = 3): string[] => {
  const pool = tagPool; 
  const text = (title + " " + content).toLowerCase(); 

  const counts: TagCount = {};
  const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  for (const [tag, keywords] of Object.entries(pool)) {
    const kwArray = keywords as string[];
    counts[tag] = 0;

    for (const word of kwArray) {
      const escapedWord = escapeRegExp(word.toLowerCase());
      const regex = new RegExp(escapedWord, "gi");
      const match = text.match(regex);
      if (match) {
        counts[tag] += match.length;
      }
    }
  }
  const sortedTags = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])  
    .filter(([_, count]) => count > 0)  
    .map(([tag]) => tag);
    return sortedTags.slice(0, topN);
};
  
  const resetFormatting = () => {
  const ed = getTargetEditor();
  if (!ed) return;
  ed.chain()
    .focus()
    .unsetAllMarks()   
    .clearNodes()      
    .setParagraph()   
    .run();
};
  
  const [state , setState] = useState(false);
  const [addPost] = useAddPostMutation();
  const user = localStorage.getItem("user");
  useEffect(()=>{
    if(!state)return;
    if(user){
      setDetectedTags(getTopTags(titleContent,content,3));
      if(detectedTags){
        const userParser = (JSON.parse(user) as User);
      addPost({
        UserId : userParser.id,
        Categories : detectedTags,
        title : titleContent,
        description : content,
      });
      setState(false);
      }
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state,addPost,content,titleContent,detectedTags,user]);

  const [unplashContent, setUnplashContent] = useState("");
  
  
  const handleKey = async (e : React.KeyboardEvent) => {
    if(e.key === "Enter"){
      setUnplash(false);
      setUnplashContent("");
    }
    
  }
  
  const getTargetEditor = (preferred?: "title" | "content") => {
    if (preferred === "title") return titleEditor ?? activeEditorRef.current;
    if (preferred === "content") return editor ?? activeEditorRef.current;
    return activeEditorRef.current ?? (selectionCoords?.editorType === "title" ? titleEditor : editor);
  };

  const runIfCommand = (cmdName: string, runner: (ed: Editor) => void) => {
    const ed = getTargetEditor();
    if (!ed) return;
    // @ts-expect-error : use must be any sorry IDE
    const cmds = (ed as unknown).commands;
    if (typeof cmds[cmdName] === "function") {
      try {
        runner(ed);
      } catch (err) {
        console.error(`Command ${cmdName} failed`, err);
      }
    } else {
      console.debug(`Command ${cmdName} not available on this editor`);
    }
  };

  useEffect(() => {
    if (!editor) return;
    const update = () => {
      setContent(editor.getText());
      const { state, view } = editor;
      const { from, to } = state.selection;
      if (from === to) {
        if (activeEditorRef.current === editor) setSelectionCoords(null);
        return;
      }
      const start = view.coordsAtPos(from);
      const end = view.coordsAtPos(to);
      const top = Math.min(start.top, end.top) - 40;
      const left = (start.left + end.right) / 2;
      setSelectionCoords({ top, left, editorType: "content" });
      activeEditorRef.current = editor;
    };

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  useEffect(() => {
    if (!titleEditor) return;
    const update = () => {
      setTitleContent(titleEditor.getText());
      const { state, view } = titleEditor;
      const { from, to } = state.selection;
      if (from === to) {
        if (activeEditorRef.current === titleEditor) setSelectionCoords(null);
        return;
      }
      const start = view.coordsAtPos(from);
      const end = view.coordsAtPos(to);
      const top = Math.min(start.top, end.top) - 40;
      const left = (start.left + end.right) / 2;
      setSelectionCoords({ top, left, editorType: "title" });
      activeEditorRef.current = titleEditor;
    };
    titleEditor.on("selectionUpdate", update);
    titleEditor.on("transaction", update);
    
    return () => {
      titleEditor.off("selectionUpdate", update);
      titleEditor.off("transaction", update);
    };
  }, [titleEditor]);
useEffect(() => {
  if (editor) setContent(editor.getText());
  if (titleEditor) setTitleContent(titleEditor.getText());
}, [editor, titleEditor]);

useEffect(() => {
  if (editor) setContent(editor.getText());
  if (titleEditor) setTitleContent(titleEditor.getText());
}, [editor, titleEditor]);

  const openLinkInputForActive = () => {
    const selEditor = getTargetEditor();
    if (!selEditor) return;
    const { from, to } = selEditor.state.selection;
    if (from === to) return;
    const start = selEditor.view.coordsAtPos(from);
    const end = selEditor.view.coordsAtPos(to);
    const top = Math.min(start.top, end.top) - 10;
    const left = (start.left + end.right) / 2;
    setLinkInputCoords({ top, left });
    setShowLinkInput(true);
  };

  const applyLink = () => {
    const selEditor = getTargetEditor();
    if (!selEditor) return;
    runIfCommand("setLink", (ed) => ed.chain().focus().setLink({ href: linkUrl }).run());
    setShowLinkInput(false);
    setLinkUrl("");
  };
  const sectionRemove = () => {
  const ed = getTargetEditor();
  if (!ed) return;
  ed.chain().focus().deleteNode("image").insertContent("<p></p>").focus("end")
    .run();
  }
  return (
    <div style={{ width: "100%" }} >
      {selectionCoords && (
        <div
          ref={toolbarRef}
          className="floating-toolbar"
          style={{
            background: "rgba(36, 36, 36, 1)",
            borderRadius: "15px",
            position: "absolute",
            top: selectionCoords.top,
            left: selectionCoords.left,
            transform: "translate(-50%, -100%)",
            border: "1px solid #ccc",
            padding: "6px 10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 999,
            display: "flex",
            gap: "6px",
          }}
        >
          <button className="bt" onClick={() => runIfCommand("toggleBold", ed => ed.chain().focus().toggleBold().run())}>B</button>

          <button className="bt" onClick={() => runIfCommand("toggleItalic", ed => ed.chain().focus().toggleItalic().run())}>I</button>


          <button className="bt" style={{ fontSize: "1rem" }}
            onClick={() => runIfCommand("toggleHeading", ed => ed.chain().focus().toggleHeading({ level: 1 }).run())}>T</button>

          <button className="bt" style={{ fontSize: "0.7rem" }}
            onClick={() => runIfCommand("toggleHeading", ed => ed.chain().focus().toggleHeading({ level: 2 }).run())}>T</button>

          <button className="bt" onClick={() => runIfCommand("toggleBulletList", ed => ed.chain().focus().toggleBulletList().run())}>•</button>

          <button className="bt" onClick={() => runIfCommand("toggleOrderedList", ed => ed.chain().focus().toggleOrderedList().run())}>1.</button>

          <button className="bt" onClick={openLinkInputForActive}>🔗</button>
          <button className="bt"  onClick={resetFormatting}><VscDebugRestart style={{fill:"white",color:"white",
            fontSize:"2rem"
          }}/></button>
          <button className="bt"  onClick={sectionRemove}><PiProhibitThin style={{fill:"white",color:"white",
            fontSize:"2rem"
          }}/></button>
        </div>
      )}
      <WriteNavbar handlePublish={handlePublishBase}/>
      {showLinkInput && (
        <div
          style={{
            position: "absolute",
            top: linkInputCoords.top,
            left: linkInputCoords.left,
            background:"rgba(42, 42, 42, 1)",
            borderRadius: "6px",
            padding: "4px",
            zIndex: 1000,
            display: "flex",
            gap: "6px",
          }}
        >
          <input style={{backgroundColor:"rgba(42, 42, 42, 1)",
            outline:"none",caret:"white",color:"white",border:"none"
          }}
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL"
          />
          <button className="bt" onClick={applyLink}><BiCheck style={{fill:"white",color:"white"}}/></button>
          <button className="bt" onClick={() => setShowLinkInput(false)}><PiProhibitThin style={{fill:"white",color:"white"}}/></button>
        </div>
      )}
      
      <div className="ecc" ref={eccRef} style={{ marginTop: "50px" }}>
        <div style={{  display: "flex", height: "100%", alignItems: "center" ,width:"1000px"}}>
          <div
            style={{
              
              display:  "flex" ,
              width:"50px",
              alignItems: "center",
              borderRight: titleContent.trim().length>=1 ? "1px solid rgba(214, 214, 214, 1)" : "",
            }}
          >
            <h6 style={{ opacity: "0.6", fontWeight: "400",display: titleContent.trim().length>=1 ? "block" : "none" }}>Title</h6>
            
          </div>
            <EditorContent
              onFocus={() => {
                activeEditorRef.current = titleEditor;
              }}
              className="et nop"
              editor={titleEditor}
            />
        </div>
        <div style={{display:"flex",width:"1000px",position:"relative"}}>
          <div style={{width:"50px",display:"flex",justifyContent:"center"}}>
          </div>
          {
            isUnplash? <input style={{
              width:"900px",
              border:"none",
              borderBottom:"1px solid grey",
              outline:"none",
              padding:"4px 0px",
              fontSize:"0.9rem",
              fontStyle:"oblique"
            }} type="text" placeholder="Type keyword the search Unplash and press enter"
            value={unplashContent} onChange={(e)=>
              setUnplashContent(e.target.value)
            } onKeyDown={handleKey}/> : 
            <EditorContent
               style={{marginTop:"30px"}}
            onFocus={() => {
              activeEditorRef.current = editor;
            }}
            className="et"
            editor={editor}
          />
          }
               
        </div>
         
      </div>
    </div>
  );
};
