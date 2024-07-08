import { FC } from "react"
import './style.scss'


const Header: FC = () => {
  return (
    <>
      <div className="header-wrapper">
        <h1 className="styled-logo">
          <a href="#">TodoList</a>{' '}
          <span>
            Powered by{' '}
            <a href="https://github.com/Vampi090" target="_blank" rel="noreferrer">
              Vampi090
            </a>
          </span>
        </h1>
      </div>
    </>
  );
};

export default Header;
