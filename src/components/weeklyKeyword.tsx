// 사용중인 파일이 아닙니다.

// import React, { useEffect, useState } from "react";
// import * as Naver from "@/src/api/NaverAPI";
// var date = new Date().toLocaleDateString();
// var today = Date.parse(date);
// var result: string[] = [];
// result.push(date);
// for (var i = 0; i < 7; i++) {
//   today -= 86400000;
//   result.push(new Date(today).toLocaleDateString());
// }
// // var today = new Date();
// // var day = today.getDate();
// // var month = today.getMonth();
// // var year = today.getFullYear();
// // var today2 = new Date().toLocaleDateString();

// // var Aweek = new Date(new Date().setDate(day - 7));
// // function formattingDate(date: Date) {
// //   var y = date.getFullYear();
// //   var m = ("0" + (date.getMonth() + 1)).slice(-2);
// //   var d = ("0" + date.getDate()).slice(-2);
// //   return y + "-" + m + "-" + d;
// // }

// const WeeklyKeyword = ({ searchTerm }) => {
//   const [data2, setData2] = useState("");
//   const [sortable, setSortable] = useState([]);
//   const [searchTerm2, setSearchTerm2] = useState("");
//   var defaultData = "오염수";
//   useEffect(() => {
//     if (searchTerm != "") {
//       defaultData = searchTerm;
//     }
//     Naver.newstitle(defaultData).then((res: string) => {
//       let data = "";
//       for (var i = 0; i < res.length; i++) {
//         data += res[i];
//       }
//       setData2(data);
//     });
//   }, [searchTerm]);
//   useEffect(() => {
//     // fetchData();
//     function decode(contents) {
//       let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
//       if (contents != undefined && contents != null && contents != "") {
//         contents = contents.replace(/<br\/>/gi, "\n");
//         contents = contents
//           .replace(/&lt;/g, " ")
//           .replace(/&gt;/g, " ")
//           .replace(/&amp;/g, " ")
//           .replace(/&quot;/g, " ")
//           .replace(/&nbsp;/g, " ")
//           .replace(/&apos;/g, " ")
//           .replace(/’/g, " ")
//           .replace(/‘/g, " ")
//           .replace(/“/g, " ")
//           .replace(/”/g, " ")
//           .replace(/'+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
//           .replace(/"+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
//           .replace(/,+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
//           .replace(/\.+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
//           .replace(/[ぁ-ゔ]+|[ァ-ヴー]+[々〆〤]/g, "")
//           .replace(/[一-龠]+|[0-9]+|[a-zA-Z]+/g, "");

//         contents = contents.replace(/<[^>]*>?/g, " ").replace(reg, "");
//       }
//       return contents;
//     }
//     const result = {};
//     decode(data2)
//       .split(" ")
//       .forEach((element) => {
//         result[element] = (result[element] || 0) + 1;
//       });
//     // const sortable = Object.entries(result).sort(([, a], [, b]) => b - a);
//     const obj = {};
//     var sortable = [];
//     for (var name in result) {
//       sortable.push([name, result[name]]);
//     }

//     sortable.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     sortable.forEach(([key, value]) => (obj[key] = value));
//     // result
//     // console.log(decode(data2).split(" "));
//     console.log(typeof sortable);
//     console.log(sortable[1]);
//     // console.log(Object.values(sortable[1][0]));
//     setSortable(sortable);
//   }, [data2]);
//   const handleChange = () => {
//     setSearchTerm2(document.getElementById("rd").innerHTML || "오염수");

//     console.log(searchTerm2);
//   };

//   const handleSearch = async (event) => {
//     handleChange();
//     event.preventDefault();
//     try {
//       const results = await Naver.onSearch(searchTerm2);
//       searchTerm(searchTerm2);
//       console.log("검색 결과:", results);
//     } catch (error) {
//       console.error("오류 발생:", error);
//     } // 입력 값을 부모 컴포넌트로 전달
//   };
//   function weeklyRank() {
//     var rank = [];
//     for (var i = 0; i < 10; i++) {
//       const rankData = (sortable[i + 1] || [])[0];
//       rank.push(
//         <li className="flex justify-between" /*onClick={handleSearch}*/>
//           <div>{i + 1}</div>
//           <div id="rd">{rankData}</div>
//         </li>
//       );
//     }
//     return rank;
//   }
//   return (
//     <form>
//       <div id="week">
//         <div className="keywordHead">
//           <div className="title">주간 키워드</div>
//           <span>
//             {result[6]} ~ {result[0]}
//           </span>
//         </div>
//         <ul className="w-full">{weeklyRank()}</ul>
//       </div>
//     </form>
//   );
// };
// export default WeeklyKeyword;
