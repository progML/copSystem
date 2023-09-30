package ru.mil.cop.attempt.dto;

import lombok.Data;

import java.util.List;

@Data
public class AttemptSubmissionDto {
        private List<List<Integer>> answers;
}
