import type { GradeDetails } from "types/grade";

export const GRADE_LIST: {[key: string]: GradeDetails} = {
  EXCELLENT: {key: 'EXCELLENT', text: 'Отлично'},
  GOOD: {key: 'GOOD', text: 'Хорошо'},
  SATISFACTORY: {key: 'SATISFACTORY', text: 'Удовлетворительно'},
  UNSATISFACTORY: {key: 'UNSATISFACTORY', text: 'Неудовлетворительно'},
}
