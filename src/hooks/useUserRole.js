import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/users/user-role/${user.email}`);
      const data = await res.json();
      return data.role;
    },
  });

  return { role: roleData, roleLoading };
};

export default useUserRole;
