import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="error-page">
      <h3>404</h3>
      <p className="error-page-text">Страница не найдена</p>
      <Link className="error-page-link" to="/login">
        Назад
      </Link>
    </div>
  );
};

export default Page404;
