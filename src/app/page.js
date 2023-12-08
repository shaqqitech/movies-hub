import Main from "./components/Main";
import Row from "./components/Row";
import requests from "@/Requests";

export default function Home() {
  return (
    <main className="w-screen min-h-screen">
      <Main />
      <Row rowID='1'  title={'Popular'} fetchURL={requests.requestPopular} link={'/popular'}/>
      <Row rowID='2'  title={'Top Rated'} fetchURL={requests.requestTopRated} link={'/top-rated'}/>
      <Row rowID='3'  title={'Trending'} fetchURL={requests.requestTrending} link={'/trending'}/>
      <Row rowID='4'  title={'Up Coming'} fetchURL={requests.requestUpComing} link={'/upcoming'}/>
    </main>
  )
}
