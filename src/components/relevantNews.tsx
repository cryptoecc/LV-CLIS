import React, { useEffect, useState } from "react";
import { newstitle, newsURL } from "@/src/api/NaverAPI";
const RelevantNews = ({ searchTerm }) => {
  const [data2, setData2] = useState([]);
  const [url, seturl] = useState([]);
  var defaultData = "오염수";
  let data: string[] = [];
  let urltemp: string[] = [];
  useEffect(() => {
    if (searchTerm != "") {
      defaultData = searchTerm;
    }
    newstitle(defaultData).then((res: string) => {
      for (var i = 0; i < res.length; i++) {
        data[i] = res[i];
      }
      setData2(data);
    });
    newsURL(defaultData).then((res: string) => {
      for (var i = 0; i < res.length; i++) {
        urltemp[i] = res[i];
      }
      seturl(urltemp);
    });
    // console.log(data2);
  }, [searchTerm]);
  function decode(contents: string) {
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
  function Title(a: number, b: number) {
    var rank = [];
    for (var i = a; i < b; i++) {
      rank.push(
        <div className="flex">
          {/* <span>{i + 1}</span> */}
          <ul className="ml-7 flex list-disc mb-2">
            <a href={url[i]}>
              <li className="text-sm">{decode(data2[i])}</li>
            </a>
          </ul>
        </div>
      );
    }
    return rank;
  }
  return (
    <div id="relevant">
      <div className="title mt-2">관련 뉴스</div>
      <div className="relevantNews flex h-full pb-2 text-sm">
        <div className="news1 w-96">{Title(0, 6)}</div>
        <span className="h-full partition ml-4 mr-4"></span>
        <div className="news2">{Title(8, 15)}</div>
      </div>
    </div>
  );
};
export default RelevantNews;
