import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ActivationMail } from "./features/activationmail/ActivationMail";
import { Membership } from "./features/membership/Membership";
import { OurStory } from "./features/ourstory/OurStory";
import { ChangeToComponentOrTo } from "./shared/ChangeToComponentOrTo";
import { SignupWithSignin } from "./features/signin/SignupWithSignin";
import { Medium } from "./features/medium/Medium";
import { SigninProvider } from "./shared/hooks/SigninProvider";
import { SignupProvider } from "./shared/hooks/SignupProvider";
import { HomePage } from "./features/home/pages/HomePage";
import { useMeMutation } from "./app/services/AuthService";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Editor } from "./features/write/editor";
import { setUser, type User } from "./app/slices/UserSlice";
import { PostDetail } from "./features/medium/components/PostDetail";
import "./index.css"
export const App = () => {
  const [me, { data }] = useMeMutation();
  const localUserInfo = localStorage.getItem("user");
  const user: User | null = localUserInfo ? JSON.parse(localUserInfo) : null;
  const dispatch = useDispatch();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      setUserLoaded(true); 
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await me({
          username: user.username,
          email: user.email,
          id: user.id,
        }).unwrap();
        dispatch(setUser(response));
      } catch (err) {
        console.error(err);
      } finally {
        setUserLoaded(true);
      }
    };

    if(data === null || data === undefined)
    {
      fetchUser();
    }
  }, []);
  
  if (!userLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SigninProvider>
              <SignupProvider>
                <ChangeToComponentOrTo change="nologin" or="/medium">
                  <HomePage />
                </ChangeToComponentOrTo>
              </SignupProvider>
            </SigninProvider>
          }
        />
        <Route
          path="/write"
          element={
            <ChangeToComponentOrTo change="login" or="/">
              <Editor />
            </ChangeToComponentOrTo>
          }
        />
        <Route
          path="/medium"
          element={
            <ChangeToComponentOrTo change="login" or="/">
              <Medium />
            </ChangeToComponentOrTo>
          }
        />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/verify" element={<ActivationMail />} />
        <Route
          path="/signupwithsignin/:email"
          element={
            <ChangeToComponentOrTo change="nologin" or="/medium">
              <SignupWithSignin />
            </ChangeToComponentOrTo>
          }
        />
          <Route path="/medium/post/:id" 
          element={<ChangeToComponentOrTo change="login" or="/"><PostDetail/></ChangeToComponentOrTo>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
