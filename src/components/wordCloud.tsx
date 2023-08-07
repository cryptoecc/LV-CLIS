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
        if (contents != undefined && contents != null && contents != "") {
          contents = contents.replace(/<br\/>/gi, "\n");
          contents = contents
            .replace(/&lt;/g, "")
            .replace(/&gt;/g, "")
            .replace(/&amp;/g, "")
            .replace(/&quot;/g, "")
            .replace(/&nbsp;/g, "")
            .replace(/&apos;/g, "");
          contents = contents.replace(/<[^>]*>?/g, "");
        }
        return contents;
      }

      let series = root.container.children.push(
        am5wc.WordCloud.new(root, {
          angles: [0, 0],
          rotation: 0,
          maxCount: 15,
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
