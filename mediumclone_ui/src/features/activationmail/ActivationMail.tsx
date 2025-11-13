import { useSearchParams } from "react-router-dom";
import "./activation.css";
import { useConfirmVerifyMutation } from "../../app/services/ActivationService";
import { useEffect } from "react";

export const ActivationMail = () => {
  
  const userString = localStorage.getItem("email"); 
  const email = userString ? JSON.parse(userString) : null;
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [confirm, { isLoading, isSuccess, error }] = useConfirmVerifyMutation();
  
  useEffect(() => {
    if (!token || !email) return;
    confirm({
      email,
      token,
    });
  }, [email, token, confirm]);

  useEffect(()=>{
  if (!isSuccess) return;
  const bc = new BroadcastChannel("activation_channel");
  bc.postMessage({ isVerified: true });
  return ()=> bc.close(); 
  },[isSuccess]);

  return (
    <div className="actc">
      <div className="actcc">
        {isLoading && <h4>İşleminiz onaylanıyor, lütfen bekleyiniz...</h4>}
        {isSuccess && <h4>✅ Hesabınız başarıyla aktifleştirildi!</h4>}
        {error && <h4>❌ Bir hata oluştu. Lütfen tekrar deneyin.</h4>}
        {error && <h4>Tekrar linke tıklayarak onaylamayı deneyebilirsiniz.</h4>}
        {isSuccess && <h4>Bu sayfayı kapatabilirsiniz, sonraki adıma yönlendirildiniz.</h4>}
      </div>
    </div>
  );
};
