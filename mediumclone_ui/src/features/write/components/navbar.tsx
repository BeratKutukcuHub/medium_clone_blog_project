import { GoBell } from "react-icons/go"
import { TbListDetails } from "react-icons/tb"
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const WriteNavbar = ({handlePublish} : {handlePublish : ()=> void}) => {
    const userInformations = useSelector((state: RootState) => state.user);
    console.log(userInformations);
    return (
        <>
        <nav style={{ height: "65px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            width: "70%",
            margin: "auto auto",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ gap: "15px", display: "flex", alignItems: "center" }}>
            <h3 style={{ letterSpacing: "-1.2px", fontSize: "2.2rem" }}>Medium</h3>
            <h6 style={{ marginBottom: "0px", marginTop: "10px", fontSize: "0.9rem" }}>
              Draft in {userInformations.user?.username}
              <span style={{ opacity: "0.6", fontWeight: "400", wordSpacing: "2px" }}> Saved</span>
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <div
              style={{
                height: "25px",
                width: "60px",
                backgroundColor: "rgba(47, 160, 47, 1)",
                marginRight: "50px",
                borderRadius: "25px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h6 onClick={handlePublish}
                style={{
                  fontSize: "0.8rem",
                  color: "white",
                  margin: "auto auto",
                  alignSelf: "center",
                  cursor:"pointer"
                }}
              >
                Publish
              </h6>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <TbListDetails fontSize={"20px"} style={{ cursor: "pointer", opacity: "0.6" }} />
              <GoBell fontSize={"20px"} style={{ cursor: "pointer", opacity: "0.6" }} />
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "rgb(25,25,25)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </nav>
        </>
    )
}