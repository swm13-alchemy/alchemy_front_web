import {useRouter} from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  const searchData = () => {
    console.log(searchText);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return (
    <div className="relative left-0 top-0 w-full h-12 px-2 flex items-center justify-between border-black border-2">
      <FontAwesomeIcon
        icon={faAngleLeft}
        className="fa-2x"
        onClick={() => router.back()}
      />
      <input className="appearance-none w-4/5 h-full text-xl" onChange={onChange} value={searchText} />
      <FontAwesomeIcon
        icon={faSearch}
        className="fa-2x"
        onClick={searchData}
      />
    </div>
  );
}

export default SearchBar;