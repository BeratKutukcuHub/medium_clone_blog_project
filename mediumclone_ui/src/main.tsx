import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { HomePage } from './features/home/pages/HomePage.tsx';
import { OurStory } from './features/ourstory/OurStory.tsx';
import { Membership } from './features/membership/Membership.tsx';
import { SignupProvider } from './shared/hooks/SignupProvider.tsx';
import { SigninProvider } from './shared/hooks/SigninProvider.tsx';
import { SignupWithSignin } from './features/signin/SignupWithSignin.tsx';
import { Medium } from './features/medium/Medium.tsx';
import {Provider} from "react-redux"
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={
            <SigninProvider>
                    <SignupProvider>
                        <HomePage/>
                    </SignupProvider>
                </SigninProvider>
        }/>
        <Route path='/ourstory' element={
            <>
                <SigninProvider>
                    <SignupProvider>
                        <OurStory/>
                    </SignupProvider>
                </SigninProvider>
                
            </>
        }/>
        <Route path='/membership' element={
            <>
                 <SigninProvider>
                    <SignupProvider>
                      <Membership/>
                    </SignupProvider>
                </SigninProvider>
            </>
        }/>
        <Route path='/signupwithsignin/:email' element={<SignupWithSignin/>}/>
        <Route path='/medium' element={<Medium/>}/>
        </Routes>
        </BrowserRouter>
    </Provider>
    
)
