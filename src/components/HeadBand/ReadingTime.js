import { IoTimeOutline } from "react-icons/io5";
import { formatTime } from "../../utils";

const ReadingTime = ({ children }) => (
  <div className={`flex flex-row w-max mx-auto items-center`}>
    <IoTimeOutline size={17} />
    <p className={`font-light ml-1.5 text-sm`}>{formatTime(children)}</p>
  </div>
);

export default ReadingTime;
