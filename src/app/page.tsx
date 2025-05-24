import Header from "../components/common/Header";
import Main from "../components/common/Main";
import ArtistSearchBar from "../components/artist/ArtistSearchBar";

export default function Home() {
  return (
    <div>
      <Header />
      <Main>
        <ArtistSearchBar />
      </Main>
    </div>
  );
}
