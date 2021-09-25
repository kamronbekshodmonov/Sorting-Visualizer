import { FC } from "react";
import Bar from "../../components/Bar";
import "./Home.scss";

type Props = {
  array: number[];
};

const Home: FC<Props> = ({ array }) => {
  return (
    <div className="home page">
      <div className="container">
        <Bar array={array} />
      </div>
    </div>
  );
};

export default Home;
