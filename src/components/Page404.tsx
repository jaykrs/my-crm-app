import React from 'react';
import Link from 'next/link';

const Page404: React.FC = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default Page404;
