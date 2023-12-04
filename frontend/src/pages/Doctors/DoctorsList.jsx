import React, { Suspense } from 'react';
// Use React.lazy to import DoctorsCard lazily
const LazyDoctorsCard = React.lazy(() => import('./DoctorsCard'));

function DoctorsList(data) {
  console.log(data);
  return (
    <>
      <Suspense fallback={<div>loading....</div>}>
        <LazyDoctorsCard data={data}  />
      </Suspense>
    </>
  );
}

export default DoctorsList;
