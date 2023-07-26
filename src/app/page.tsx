import Search from "@/components/search";
import Wordcloud from "@/components/wordCloud";
import NetworkChart from "@/components/networkChart";
import NewsChart from "@/components/newsChart";
import RelevantNews from "@/components/relevantNews";
import WeeklyKeyword from "@/components/weeklyKeyword";
export default function Home() {
  return (
    <article className="border body">
      <div className="headsection">
        <div className="logo text-5xl">LOGO</div>
        <Search />
      </div>
      <div className="section">
        <Wordcloud />
        <NetworkChart />
        <NewsChart />
      </div>
      <div className="section">
        <WeeklyKeyword />
        <RelevantNews />
      </div>
    </article>
  );
}
