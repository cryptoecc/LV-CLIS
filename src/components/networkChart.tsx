"use client";
import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as Naver from "@/src/api/NaverAPI";
const NetworkChart = () => {
  // const fetchData = async () => {
  //   try {
  //     const data = await Naver.NewsList();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Error handling logic here
  //   }
  // };
  useEffect(() => {
    // fetchData();
    const root = am5.Root.new("networkchartdiv");
    let series = root.container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        manyBodyStrength: -1,
        nodePadding: 10,
        xField: "x",
        yField: "y",
        minRadius: 13,
        maxRadius: 55,
      })
    );
    series.data.setAll([
      {
        name: "검색한 키워드",
        children: [
          {
            name: "연관1",
            children: [
              {
                name: "연관a",
                value: 71,
              },
              {
                name: "연관b",
                value: 33,
              },
              {
                name: "연관c",
                value: 46,
              },
            ],
          },
          {
            name: "연관2",
            children: [
              {
                name: "연관d",
                value: 78,
              },
              {
                name: "연관 e",
                value: 36,
              },
            ],
          },
          {
            name: "연관3",
            children: [
              {
                name: "연관f",
                value: 46,
              },
              {
                name: "연관g",
                value: 28,
              },
              {
                name: "연관h",
                value: 18,
              },
            ],
          },
        ],
      },
    ]);

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
  }, []);
  return (
    <div className="chart">
      <div className="title">안전 네트워크 차트</div>
      <div id="networkchartdiv" className="w-full h-full"></div>
    </div>
  );
};
export default NetworkChart;
