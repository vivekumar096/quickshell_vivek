

import React from "react";
import { useSelector } from "react-redux";
import "./DashView.css";
import Card from "../Card/Card";
import fire from "../../assets/icons_FEtask/in-progress.svg"
import plus from "../../assets/icons_FEtask/add.svg"
const DashView = () => {
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  return (
    selectedData && (
      <div className="dashContainer" style={{ justifyContent: "space-evenly" }}>
        {selectedData.map((elem, index) => {
          return (
            <>
              <div key={index} className="dashCardContainer">
                <div className="dashCardHeading flex-sb">
                  <div className="leftView">
                    {!user ? (
                      <img src = {fire} />
                    ) : (
                      <>
                        <div
                          className="imageContainer relative"
                          style={{ width: "15px", height: "15px", display : 'inline-block' }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                            src="https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="UserImage"
                          />
                        </div>
                      </>
                    )}
                    <span>
                      {" "}
                      {elem[index]?.title} {elem[index]?.value?.length}
                    </span>
                  </div>
                  <div className="rightView">
                    <img className="plus" src = {plus} />{" "}
                    <span style={{ letterSpacing: "2px" }}>...</span>
                  </div>
                </div>
                <div className="dashList flex-gap-10">
                  {elem[index]?.value?.map((elem, ind) => {
                    return (
                      <Card id={elem.id} title={elem.title} tag={elem.tag} />
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default DashView;

// import React from "react";
// import { useSelector } from "react-redux";
// import "./DashView.css";
// import Card from "../Card/Card";
// import fire from "../../assets/icons_FEtask/in-progress.svg";
// import plus from "../../assets/icons_FEtask/add.svg";

// const DashView = () => {
//   const { selectedData, user } = useSelector(
//     (state) => state.SelectDataReducer
//   );

//   return (
//     <div className="mainContainer">
//       {/* Add your navigation bar component here */}

//       {selectedData && (
//         <div className="dashContainer" style={{ justifyContent: "space-evenly" }}>
//           {selectedData.map((elem, index) => {
//             return (
//               <div key={index} className="dashCardContainer">
//                 <div className="dashCardHeading flex-sb">
//                   <div className="leftView">
//                     {!user ? (
//                       <img src={fire} alt="Fire Icon" />
//                     ) : (
//                       <div
//                         className="imageContainer relative"
//                         style={{ width: "15px", height: "15px", display: "inline-block" }}
//                       >
//                         <img
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             borderRadius: "50%",
//                           }}
//                           src="https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                           alt="UserImage"
//                         />
//                       </div>
//                     )}
//                     <span>
//                       {elem[index]?.title} {elem[index]?.value?.length}
//                     </span>
//                   </div>
//                   <div className="rightView">
//                     <img className="plus" src={plus} alt="Plus Icon" />
//                     <span style={{ letterSpacing: "2px" }}>...</span>
//                   </div>
//                 </div>
//                 <div className="dashList flex-gap-10">
//                   {elem[index]?.value?.map((elem, ind) => (
//                     <Card key={ind} id={elem.id} title={elem.title} tag={elem.tag} />
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashView;
