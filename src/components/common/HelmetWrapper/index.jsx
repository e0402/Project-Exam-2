import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetWrapper = ({ title, description }) => (
  <Helmet>
    <title>{title ? `${title} - Holidaze` : 'Holidaze'}</title>
    {description && <meta name="description" content={description} />}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/path/to/favicon.ico" />
    <meta charset="UTF-8" />
  </Helmet>
);

export default HelmetWrapper;
