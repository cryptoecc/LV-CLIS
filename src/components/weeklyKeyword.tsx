import React from "react";
var date = new Date().toLocaleDateString();
var today = Date.parse(date);
var result: string[] = [];
result.push(date);
for (var i = 0; i < 7; i++) {
  today -= 86400000;
  result.push(new Date(today).toLocaleDateString());
}
function weeklyRank() {
  var rank = [];
  for (var i = 0; i < 10; i++) {
    rank.push(
      <li className="flex justify-between">
        <div>{i + 1}</div>
        <div>{i + 1}번째 키워드</div>
      </li>
    );
  }
  return rank;
}
const WeeklyKeyword = () => {
  return (
    <div id="week">
      <div className="keywordHead">
        <div className="title">주간 키워드</div>
        <span>
          {result[6]} ~ {result[0]}
        </span>
      </div>

      <ul className="w-full">{weeklyRank()}</ul>
    </div>
  );
};
export default WeeklyKeyword;
