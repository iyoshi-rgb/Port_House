import React from "react";

async function fetchUserData(id: string) {
  const res = await fetch(`http://localhost:3000/api/my_page/${id}`, {
    cache: "no-store", //SSR
  });

  const data = await res.json();

  return data.user;
}

const UserProfile = async ({ params }: { params: { id: string } }) => {
  const user = await fetchUserData(params.id);
  console.log(user);
  return <div></div>;
};

export default UserProfile;
