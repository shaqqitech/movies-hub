import Main from "./components/Main";
import Row from "./components/Row";
import requests from "@/Requests";

export default function Home() {
  return (
    <main className="w-screen min-h-screen">
      <Main />
      <Row rowID='1'  title={'Top Rated'} fetchURL={requests.requestTopRated} link={'/top-rated'}/>
      <Row rowID='2'  title={'Trending'} fetchURL={requests.requestTrending} link={'/trending'}/>
      <Row rowID='3'  title={'Up Coming'} fetchURL={requests.requestUpcoming} link={'/upcoming'}/>
      <Row rowID='4'  title={'Airing Today'} fetchURL={requests.requestAiringToday} link={'/airing-today'}/>
      <Row rowID='5'  title={'Now Playing'} fetchURL={requests.requestNowPlaying} link={'/now-playing'}/>
      <Row rowID='6'  title={'Tv Popular'} fetchURL={requests.requestPopularTV} link={'/popular-tv'}/>
      <Row rowID='7'  title={'Tv Top Rated'} fetchURL={requests.requestTopRatedTV} link={'/top-rated-tv'}/>
      <Row rowID='8'  title={'Tv Now Playing'} fetchURL={requests.requestNowPlayingTV} link={'/playing-on-tv'}/>
      <Row rowID='9'  title={'Popular'} fetchURL={requests.requestPopular} link={'/popular'}/>
    </main>
  )
}
