package ru.mil.cop.exam;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.mil.cop.attempt.dto.AttemptInfoDto;

import java.util.List;

@Data
@AllArgsConstructor
public class ExamResultDto {
    private String name;
    private List<AttemptInfoDto> attempts;
}
