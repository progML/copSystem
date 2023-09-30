package ru.mil.cop.exam;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExamNameDto {
    private Integer id;
    private String name;
}