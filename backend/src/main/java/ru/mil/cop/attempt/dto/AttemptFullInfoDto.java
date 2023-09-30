package ru.mil.cop.attempt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mil.cop.exam.ExamEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttemptFullInfoDto {
    private AttemptInfoDto attempt;
    private ExamEntity exam;
}
