
import { Helmet } from 'react-helmet-async';

const PageMeta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title} | Gaming Store</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default PageMeta;
