import RIghtBarSearch from "./RIghtBarSearch";
import RightBarFollow from "./RightBarFollow";
import RightBarPremium from "./RightBarPremium";

const RightBar = () => {
  return (
    <div className="pl-6 py-4 hidden lg:flex lg:flex-col">
      <RIghtBarSearch />
      <RightBarPremium />
      <RightBarFollow />
    </div>
  );
};

export default RightBar;
