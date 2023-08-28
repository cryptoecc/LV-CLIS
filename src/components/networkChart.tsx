"use client";
import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as Naver from "@/src/api/NaverAPI";

const NetworkChart = ({ searchTerm }) => {
  const [data2, setData2] = useState("");
  const [defaultData, setDefaultData] = useState("오염수");
  const [keywordData, setKeywordData] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      setDefaultData(searchTerm);
    }
    Naver.newstitle(defaultData).then((res: string[]) => {
      let data = "";
      for (var i = 0; i < res.length; i++) {
        data += res[i];
      }
      setData2(data);
    });
  }, [searchTerm, defaultData]);

  useEffect(() => {
    if (!data2) return; // 데이터가 없을 경우 처리하지 않음

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

    const sortable = Object.entries(result);
    sortable.sort(([, a], [, b]) => b - a);

    const naming = sortable.map(([key, value]) => ({
      name: key,
      value: value,
    }));
    setKeywordData(naming.slice(1, 16)); // keyword 데이터 준비
  }, [data2]);
  useEffect(() => {
    if (!keywordData.length) return; // keyword 데이터가 없을 경우 처리하지 않음

    const root = am5.Root.new("networkchartdiv");
    let series = root.container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        manyBodyStrength: -1,
        nodePadding: 7,
        xField: "x",
        yField: "y",
        minRadius: 20,
        maxRadius: 55,
      })
    );

    series.data.setAll([
      {
        name: defaultData,
        children: keywordData,
      },
    ]);
    // console.log(series.data);
    // Configure labels
    series.labels.template.setAll({
      fontFamily: "Courier New",
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
  }, [keywordData, defaultData]);
  return (
    <div className="chart">
      <div className="title">안전 네트워크 차트</div>
      <div id="networkchartdiv" className="w-full h-full"></div>
    </div>
  );
};
export default NetworkChart;
