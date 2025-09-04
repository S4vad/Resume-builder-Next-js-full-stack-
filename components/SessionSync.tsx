"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setUser, clearUser, setLoading } from "@/store/slices/userSlice";
import { setResumes } from "@/store/slices/userSlice";
import { getUserResume } from "../app/action/action";
import mapPrismaResumeToState from "@/lib/map";

export default function SessionSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "loading") return;
    dispatch(setLoading(true));

    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id || "",
          name: session.user.name || undefined,
          email: session.user.email || undefined,
          image: session.user.image || undefined,
        })
      );

      const fetchUserResumes = async (userId: string) => {
        const response = await getUserResume(userId);
        if (response.success) {
          const mapped = response.data!.map((resume: any) =>
            mapPrismaResumeToState(resume)
          );
          dispatch(setResumes(mapped));
          dispatch(setLoading(false));
        }
      };
      fetchUserResumes(session.user.id!);
    } else {
      dispatch(clearUser());
    }
  }, [session, status, dispatch]);

  // This component doesn't render anything
  return null;
}
