import { useMemo } from "react";
import { getGrade } from "utils/grade";
import styles from "./GradeDetails.scss";
import { Typography } from "antd";
import cx from "classnames";
import { AttemptDetails } from "types/attempt";

interface GradeDetailsProps {
  attemptDetails?: AttemptDetails;
}

export default function GradeDetails ({attemptDetails}: GradeDetailsProps) {
  const grade = useMemo(
    () => attemptDetails && getGrade(attemptDetails.rightCount / attemptDetails.totalCount),
    [attemptDetails]
  );

  return (
    <>
      <div className={styles.section}>
        <Typography.Text>Верных ответов:</Typography.Text>
        <Typography.Text className={styles.result}>
          {attemptDetails?.rightCount}/{attemptDetails?.totalCount}
        </Typography.Text>
      </div>
      <div className={styles.section}>
        <Typography.Text>Оценка за тест:</Typography.Text>
        <Typography.Text className={cx(styles.result, styles.grade, grade && styles[grade.key.toLowerCase()])}>
          {grade?.text}
        </Typography.Text>
      </div>
    </>
  );
}
