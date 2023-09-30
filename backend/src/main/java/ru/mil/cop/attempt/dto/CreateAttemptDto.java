package ru.mil.cop.attempt.dto;

import lombok.Data;

@Data
public class CreateAttemptDto {

    private Integer examId;
    private String name;
    private String surname;
    private String patronymic;
    private String groupNumber;
}
