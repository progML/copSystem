package ru.mil.cop.attempt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.mil.cop.attempt.AttemptStatus;

import java.util.List;

@Data
@AllArgsConstructor
public class AttemptInfoDto {
    private Integer attemptId;
    private Integer examId;
    private String name;
    private String surname;
    private String patronymic;
    private String groupNumber;
    private Integer rightCount;
    private Integer totalCount;
    private AttemptStatus attemptStatus;
    private List<List<Integer>> userAnswers;
}
