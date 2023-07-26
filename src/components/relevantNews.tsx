import React from "react";
const RelevantNews = () => {
  return (
    <div id="relevant">
      <div className="title">관련 뉴스</div>
      <div className="relevantNews flex h-full pb-4 text-sm">
        <div className="news1 w-96">
          <div className="flex">
            <span>뉴시스</span>
            <ul className="ml-7 flex list-disc">
              <li>
                오염수 우려에 대형마트 편의점 &lsquo;방사능 검사&lsquo; 강화
              </li>
            </ul>
          </div>
        </div>
        <span className="h-full partition ml-4 mr-4"></span>
        <div className="news2">
          <ul className="">
            <div className="flex">
              <span>부산일보</span>
              <ul className="ml-7 flex list-disc">
                <li>조승환 해수장관, 인천종합어시장 찾아 수산물 안전 홍보</li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default RelevantNews;
