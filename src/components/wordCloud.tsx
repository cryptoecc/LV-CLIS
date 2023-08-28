"use client";
import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import * as Naver from "@/src/api/NaverAPI";

const WordCloud = ({ searchTerm }) => {
  const [data2, setData2] = useState("");
  var defaultData = "오염수";
  useEffect(() => {
    if (searchTerm != "") {
      defaultData = searchTerm;
    }
    Naver.newstitle(defaultData).then((res: string) => {
      let data = "";
      for (var i = 0; i < res.length; i++) {
        data += res[i];
      }
      setData2(data);
    });
  }, [searchTerm]);
  useEffect(() => {
    if (data2) {
      const root = am5.Root.new("chartdiv");

      function decode(contents) {
        let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
        if (contents != undefined && contents != null && contents != "") {
          contents = contents.replace(/<br\/>/gi, "\n");
          contents = contents
            .replace(/&lt;/g, " ")
            .replace(/&gt;/g, " ")
            .replace(/&amp;/g, " ")
            .replace(/&quot;/g, " ")
            .replace(/&nbsp;/g, " ")
            .replace(/&apos;/g, " ")
            .replace(/’/g, " ")
            .replace(/‘/g, " ")
            .replace(/“/g, " ")
            .replace(/”/g, " ")
            .replace(/'+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
            .replace(/"+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
            .replace(/,+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
            .replace(/\.+[가-힇ㄱ-ㅎㅏ-ㅣ]/g, "")
            .replace(/[ぁ-ゔ]+|[ァ-ヴー]+[々〆〤]/g, "")
            .replace(/[一-龠]+|[0-9]+|[a-zA-Z]+/g, "");

          contents = contents.replace(/<[^>]*>?/g, " ").replace(reg, "");
        }
        return contents;
      }
      const result = {};
      decode(data2)
        .split(" ")
        .forEach((element) => {
          result[element] = (result[element] || 0) + 1;
        });
      // const sortable = Object.entries(result)
      //   .sort(([, a], [, b]) => a - b)
      //   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
      var sortable = [];
      for (var name in result) {
        sortable.push([name, result[name]]);
      }

      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });
      // result
      // console.log(decode(data2).split(" "));
      // console.log(typeof result);
      // console.log(JSON.stringify(result));
      // console.log(sortable);
      // console.log(JSON.stringify(sortable));
      // console.log(sortable[2][0]);
      // console.log(decode(data2));
      let series = root.container.children.push(
        am5wc.WordCloud.new(root, {
          angles: [0, 0],
          rotation: 0,
          maxCount: 30,
          minFontSize: am5.percent(5),
          maxFontSize: am5.percent(25),
          colors: am5.ColorSet.new(root, {
            colors: [
              am5.color(0x095256),
              am5.color(0x087f8c),
              am5.color(0x5aaa95),
              am5.color(0x86a873),
              am5.color(0xbb9f06),
            ],
          }),
          minWordLength: 2,
          text: decode(data2),
        })
      );

      // 레이블 구성
      series.labels.template.setAll({
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        paddingRight: 6,
      });

      series.labels.template.events.on("click", (ev: any) => {
        const category = ev.target.dataItem.get("category");
        window.open(
          "https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=" +
            encodeURIComponent(category)
        );
      });

      return () => {
        root.dispose();
      };
    }
  }, [data2]);

  return (
    <div className="chart">
      <div className="title">안전 주요 키워드</div>
      <div id="chartdiv" className="w-full h-full"></div>
    </div>
  );
};

export default WordCloud;
// "use client";
// import React, { useEffect, useState } from "react";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5wc from "@amcharts/amcharts5/wc";
// const WordCloud = () => {
//   const [csvData, setCsvData] = useState([]);
//   useEffect(() => {
//     async function fetchCsvData() {
//       try {
//         const response = await fetch("/api/read-csv");
//         const { data } = await response.json();
//         setCsvData(data);
//       } catch (error) {
//         console.error("Error fetching CSV data:", error);
//       }
//     }

//     fetchCsvData();
//     function decode(contents) {
//       if (contents != undefined && contents != null && contents != "") {
//         contents = contents.replace(/<br\/>/gi, "\n");
//         contents = contents
//           .replace(/&lt;/g, " ")
//           .replace(/&gt;/g, " ")
//           .replace(/&amp;/g, " ")
//           .replace(/&quot;/g, " ")
//           .replace(/&nbsp;/g, " ")
//           .replace(/&apos;/g, " ");

//         contents = contents.replace(/<[^>]*>?/g, " ");
//       }
//       return contents;
//     }
//     console.log(csvData);
//     console.log(JSON.stringify(csvData, null, 2));
//     const root = am5.Root.new("chartdiv");
//     let series = root.container.children.push(
//       am5wc.WordCloud.new(root, {
//         angles: [0, 0],
//         rotation: 0,
//         maxCount: 10,
//         minFontSize: am5.percent(5),
//         maxFontSize: am5.percent(25),
//         minWordLength: 2,
//         excludeWords: [
//           "것으로",
//           "것이라고",
//           "본다고",
//           "했다며",
//           "했다고",
//           "했다",
//         ],
//         // text: d1,
//         text: "해수차관 '후쿠시마 오염수 방류 갈등… 과학과 미신의 대결'일본이 중국에 후쿠시마 제1원전 오염수 방류 문제를 논의하자고 제안한 것으로 알려진 가운데 중국 당국의 입장을 대변하는 관영매체가 논의를 시작하려면 방류 계획을 중단하라는 주장을 내놨습니다.중국 관영 환구시보와 글로벌타임스는 공동 사설을 통해 일본이 오염수 문제와 관련해 중국에 전문가와 실무자가 참여하는 논의 테이블을 제안했다는 소식을 전하며, 이 같이 주장했습니다.오염수 방류가 초읽기에 들어가며 최근 가격이 껑충 뛴 천일염에 대해서는 정부가 비축 물량을 풀 것이라며 조만간 가격이 예년 수준에 가까워질 것이라고 했다. 이날 해수부는 21일부터 다음 달 8일까지 정부 비축 천일염 400t을 시장에 공급할 것이라고 발표했다. 공급된 천일염은 지난 6월 소비자가격보다 약 20% 할인된 가격에 판매될 예정이다.괴담으로 인한 (수산물) 소비 위축이 우려되는데 아직 데이터상으로는 소비가 급격히 위축되는 것을 가시적으로 확인하지 못했다”고 덧붙였다. 박 차관은 일본으로부터 공식적으로 오염수 방류 시점을 통보받은 바는 없다며 방류하기를 앞서 인접 국가와는 시기 조율을 거칠 것으로 본다고 했다.",
//       })
//     );

//     // 레이블 구성
//     series.labels.template.setAll({
//       paddingTop: 5,
//       paddingBottom: 5,
//       paddingLeft: 5,
//       paddingRight: 5,
//       fontFamily: "Courier New",
//     });
//     series.labels.template.events.on("click", (ev: any) => {
//       const category = ev.target.dataItem.get("category");
//       window.open(
//         "https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=" +
//           encodeURIComponent(category)
//       );
//     });
//     return () => {
//       root.dispose();
//     };
//   }, []);
//   return (
//     <div className="chart">
//       <div className="title">안전 주요 키워드</div>
//       <div id="chartdiv" className="w-full h-full"></div>
//     </div>
//   );
// };

// export default WordCloud;
