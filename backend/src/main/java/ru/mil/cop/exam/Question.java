package ru.mil.cop.exam;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class Question {
    private String text;
    private Map<Integer, String> answers;
    private List<Integer> rightAnswer;
}
