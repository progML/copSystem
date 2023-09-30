'use client';

import { Button, Checkbox, Form, Input, Row } from "antd";
import { requiredRule } from "constants/rules";
import styles from "./QuestionDetail.scss";
import { CloseOutlined } from "@ant-design/icons";
import { EMPTY_EXAM_DETAIL } from "constants/exam";
import { useAppContext } from "contexts/AppContext";
import type { Exam } from "types/exam";

interface QuestionDetailProps {
  name: number,
  restField: { fieldKey?: number },
  initialValues?: Exam,
  questionIndex?: number,
  isEditable?: boolean,
  isSelectable?: boolean,
}

export default function QuestionDetail({
  name,
  initialValues,
  restField,
  questionIndex,
  isEditable,
  isSelectable
}: QuestionDetailProps) {
  return (
    <>
      {isEditable ? (
        <Form.Item
          {...restField}
          name={[name, 'text']}
          rules={[requiredRule]}
        >
          <Input.TextArea placeholder='Текст вопроса' />
        </Form.Item>
      ) : (
        <span className={styles.questionText}>{initialValues?.questions?.[Number(questionIndex)].text}</span>
      )}
      <Form.List name={[name, 'answers']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name: answerName, ...restField }, index) => (
              <Row key={key} className={styles.answerWrapper}>
                <Form.Item
                  help={false}
                  name={[answerName, 'isSelected']}
                  valuePropName="checked"
                >
                  <Checkbox disabled={!isSelectable} />
                </Form.Item>
                {isEditable ? (
                  <>
                    <Form.Item
                      {...restField}
                      help={false}
                      name={[answerName, 'text']}
                      rules={[requiredRule]}
                    >
                      <Input placeholder={`Вариант ответа ${index + 1}`} />
                    </Form.Item>
                    <Button
                      disabled={fields.length === 1}
                      icon={<CloseOutlined />}
                      onClick={() => remove(answerName)}
                    />
                  </>
                ) : (
                  <span>{initialValues?.questions?.[Number(questionIndex)].answers[index].text}</span>
                )}
              </Row>
            ))}
            {isEditable && (
              <Button className={styles.addButton} onClick={() => add(EMPTY_EXAM_DETAIL.questions?.[0].answers?.[0])}>
                Добавить ответ
              </Button>
            )}
          </>
        )}
      </Form.List>
    </>
  );
}
