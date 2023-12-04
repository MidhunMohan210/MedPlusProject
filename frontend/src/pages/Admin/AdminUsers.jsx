import { useState, useEffect } from "react";
import fechUsers from "../../hooks/useFetchData";
import { BASE_URL, adminToken } from "../../config";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'  



const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { data, error, loading, refetch } = fechUsers(
    `${BASE_URL}/admin/getAllUser`
  );
  useEffect(() => {
    if (error) {
      console.log(error);
    } else if (!error && !loading) {
      setUsers(data);
    }
  }, [error, loading, data]);

  // console.log(users);

  const handleBlock = async (userId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
      cancelButtonText:"Cancel it"
      
    });

    if (confirmResult.isConfirmed){


    try {
      const res = await fetch(`${BASE_URL}/admin/blockUser/${userId}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${adminToken} `,
        },
      });

      let result = await res.json();
      console.log("result", result.message);

      if (!res.ok) {
        throw new Error(result.message);
      }
      Swal.fire({
        title: "Done!",
        text: "Your changed the patient status.",
        icon: "success",
      });
        
      refetch();
    } catch (error) {
      console.log(error);
      
      Swal.fire({
        title: "Error!",
        text: "An error occurred while changing the status.",
        icon: "error",
      });
      
    }
  }
  };

  return (
    <section className="container">
      <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-[#ca62ea]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl.No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Blood Group
              </th>
              <th scope="col" className="px-6 py-3">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  className="bg-white border-b hover:bg-[#e8e8ff]"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.bloodType}</td>
                  <td className="px-6 py-4">
                    {user.isBlocked ? (
                      <button
                        onClick={() => handleBlock(user._id)}
                        className="px-4 py-2 font-semibold text-white bg-green-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white hover:border-transparent"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlock(user._id)}
                        className="px-4 py-2 font-semibold text-white bg-red-500 border border-red-500 rounded hover:bg-red-800 hover:text-white hover:border-transparent"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b hover:bg-gray-100">
                <td
                  colSpan={8}
                  className="px-6 py-4 font-medium text-center text-gray-900"
                >
                  No users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
  
};

export default AdminUsers;
