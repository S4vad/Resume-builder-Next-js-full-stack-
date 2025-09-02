"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setUser, clearUser } from "@/store/slices/userSlice";
import { setResumes } from "@/store/slices/userSlice";
import { getUserResume } from "@/action/action";
import { ResumeState } from "@/types/types";
import mapPrismaResumeToState from "@/lib/map";

export default function SessionSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "loading") return;

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
        console.log("respo session", response.data);
        if (response.success) {
          const mapped = response.data!.map((resume: any) =>
            mapPrismaResumeToState(resume)
          );
          dispatch(setResumes(mapped));
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
