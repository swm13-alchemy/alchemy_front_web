import type { NextPage } from 'next'
import BottomNavBar from "../components/layout/BottomNavBar";
import SearchBtn from "../components/common/SearchBtn";
import Seo from "../components/layout/Seo";

const MY: NextPage = () => {
  return (
    <div>
      <Seo title="MY" />
      <SearchBtn />
      <BottomNavBar />
    </div>
  )
}

export default MY
