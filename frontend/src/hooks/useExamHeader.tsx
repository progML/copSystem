import { useQuery } from "@tanstack/react-query";
import type { ExamPayload } from "types/exam";
import Api from "services/api";
import { useLayoutEffect } from "react";
import { initialState, useAppContext } from "contexts/AppContext";

interface useExamHeaderProps {
  examId?: number;
  isFetchingName?: boolean;
  examName?: string;
}

export function useExamHeader({examId, examName, isFetchingName = true}: useExamHeaderProps) {
  const { setHeaderText } = useAppContext();

  const { data: examDetails } = useQuery<ExamPayload>({
    queryKey: ['getExamDetails', examId],
    queryFn: () => Api.getExamDetails(examId || 0),
    enabled: isFetchingName,
  });

  useLayoutEffect(() => {
    const value = examName || examDetails?.name;
    if (value) setHeaderText(value);

    return () => setHeaderText(initialState.headerText);
  }, [examDetails, examName]);
}
